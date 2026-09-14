#!/usr/bin/env python3
"""
Cross-checks every class defined in *.css against every .vue file, and
reports CSS classes that don't appear to be referenced anywhere.

This is a stand-in for a proprietary `geonomix/unused-classes` Stylelint
plugin referenced in another codebase's lint spec, which isn't available to
install here. Rather than fake having it, this does the same underlying
check as a plain script: usable today, and easy to read/extend since it's
~80 lines of plain Python instead of a Stylelint plugin API integration.

Usage: python3 scripts/check_unused_css_classes.py
Exit code is non-zero if any class looks unused, so it can be wired into CI
later (`python3 scripts/check_unused_css_classes.py || true` first, until
the existing backlog it finds is triaged).

Caveats (real ones — read before treating output as gospel):
- Classes built by string concatenation/interpolation in <script> (e.g.
  `` `card--${variant}` ``) won't be recognized as "used" by this script's
  regexes and may show up as false positives. Check the component's
  `<script>` block before deleting anything this script flags.
- Global/base classes applied only via JS (`document.documentElement.
  classList.add(...)`, `element.classList.add(...)` in composables/plugins)
  are checked too (see PLUGIN_JS_GLOBS below) but only for simple string
  literal class names.
"""
import glob
import re
import sys

CSS_GLOBS = ["**/*.css"]
VUE_GLOBS = ["**/*.vue"]
# Non-.vue places a class name could legitimately be applied via JS.
PLUGIN_JS_GLOBS = ["composables/**/*.ts", "plugins/**/*.ts", "app.vue", "error.vue"]
EXCLUDE_DIRS = ("node_modules", ".nuxt", ".output", "dist")

# Classes intentionally not authored as a literal string anywhere (e.g. Vue
# auto-generated transition classes, or applied only by a third-party
# library at runtime) — real, known exceptions, not a way to silence
# everything.
KNOWN_DYNAMIC = {
    "modal_fade-enter-active", "modal_fade-enter-from", "modal_fade-enter-to",
    "modal_fade-leave-active", "modal_fade-leave-from", "modal_fade-leave-to",
}


def _excluded(path):
    return any(f"/{d}/" in path or path.startswith(f"{d}/") for d in EXCLUDE_DIRS)


def _read(path):
    return open(path, encoding="utf-8", errors="ignore").read()


def find_css_classes():
    # Only scan actual selector preludes (the text between a `}`/start-of-file
    # and the next `{`), never declaration bodies — otherwise numeric values
    # like `margin: .5em` get misread as a class selector `.5em`.
    classes = {}  # class_name -> [(file, line)]
    for pattern in CSS_GLOBS:
        for f in glob.glob(pattern, recursive=True):
            if _excluded(f):
                continue
            text = _read(f)
            text = re.sub(r"/\*.*?\*/", "", text, flags=re.DOTALL)
            for m in re.finditer(r"([^{}]+)\{", text):
                prelude = m.group(1)
                if not prelude.strip() or prelude.strip().startswith("@"):
                    continue
                line_no = text[:m.start(1)].count("\n") + 1
                for cm in re.finditer(r"\.([a-zA-Z0-9_-]+)", prelude):
                    classes.setdefault(cm.group(1), []).append((f, line_no))
    return classes


def find_used_classes():
    used = set()
    class_attr_re = re.compile(r"""class=["']([^"']+)["']""")
    bound_class_obj_re = re.compile(r""":class=["']\{([^}]*)\}["']""")
    bound_class_arr_str_re = re.compile(r"""['"]([a-zA-Z0-9_-]+)['"]""")

    for pattern in VUE_GLOBS + PLUGIN_JS_GLOBS:
        for f in glob.glob(pattern, recursive=True):
            if _excluded(f):
                continue
            text = _read(f)
            for m in class_attr_re.finditer(text):
                used.update(m.group(1).split())
            for m in bound_class_obj_re.finditer(text):
                # `{ 'foo--active': someCondition, bar: other }` — keys are
                # either quoted strings or bare identifiers.
                body = m.group(1)
                for key_m in re.finditer(r"""['"]([a-zA-Z0-9_-]+)['"]\s*:""", body):
                    used.add(key_m.group(1))
                for key_m in re.finditer(r"(?:^|,)\s*([a-zA-Z0-9_-]+)\s*:", body):
                    used.add(key_m.group(1))
            # classList.add('foo'), classList.toggle('foo', ...), etc.
            for m in re.finditer(r"classList\.(?:add|toggle|remove|contains)\(\s*['\"]([a-zA-Z0-9_-]+)['\"]", text):
                used.add(m.group(1))
            # setAttribute('class', 'foo bar') or similar plain string usage
            for m in bound_class_arr_str_re.finditer(text):
                used.add(m.group(1))
    return used


def find_dynamic_prefixes():
    # Classes built as `` `foo--${variant}` `` (e.g. system_tile.vue's
    # `` `system_tile--${surface.variant}` ``) can't be matched by exact
    # name — pull out the literal prefix before the first `${` instead, and
    # treat any CSS class starting with it as used.
    prefixes = set()
    template_re = re.compile(r"`([a-zA-Z0-9_-]+)\$\{")
    for pattern in VUE_GLOBS + PLUGIN_JS_GLOBS:
        for f in glob.glob(pattern, recursive=True):
            if _excluded(f):
                continue
            text = _read(f)
            for m in template_re.finditer(text):
                prefixes.add(m.group(1))
    return prefixes


def main():
    css_classes = find_css_classes()
    used = find_used_classes()
    dynamic_prefixes = find_dynamic_prefixes()

    def is_used(name):
        if name in used or name in KNOWN_DYNAMIC:
            return True
        return any(name.startswith(prefix) for prefix in dynamic_prefixes)

    unused = {
        name: locations
        for name, locations in css_classes.items()
        if not is_used(name)
    }

    if not unused:
        print(f"OK — all {len(css_classes)} CSS classes appear to be referenced.")
        return 0

    print(f"{len(unused)} of {len(css_classes)} CSS classes were not found referenced in any .vue/.ts file:\n")
    for name in sorted(unused):
        locs = ", ".join(f"{f}:{ln}" for f, ln in unused[name][:3])
        print(f"  .{name}  ({locs})")
    print("\nCheck each by hand before deleting — see the caveats in this script's docstring.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
