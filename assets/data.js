import recommendation1 from "assets/files/refference_letter-kashim.pdf";
import recommendation2 from "assets/files/recommendation_letter-athena_plus.pdf";
import recommendation3 from "assets/files/recommendation_letter-key_horse.pdf";
import cv from "assets/files/Zhassulan_Serikuly-CV.pdf";
import image from "assets/images/photo.png";
import zs from "assets/images/logos/zs.png";
import a_lux from "assets/images/logos/a-lux.png";
import athena_plus from "assets/images/logos/athena-plus.png";
import kashim from "assets/images/logos/kashim.png";
import key_horse from "assets/images/logos/key-horse.png";
import abi_construction from "assets/images/projects/abi-construction.png";
import age_counter from "assets/images/projects/age-counter.png";
import art_galery from "assets/images/projects/art-galery.png";
import asia_credit_bank from "assets/images/projects/asia-credit-bank.png";
import azm_trade from "assets/images/projects/azm-trade.png";
import check_market from "assets/images/projects/check-market.png";
import dobraya from "assets/images/projects/dobraya.png";
import dostyk_trans_terminal from "assets/images/projects/dostyk-trans-terminal.png";
import ikeruen from "assets/images/projects/ikeruen.png";
import kazmed from "assets/images/projects/kazmed.png";
import kostyum from "assets/images/projects/kostyum.png";
import m1_service from "assets/images/projects/m1-service.png";
import melissa from "assets/images/projects/melissa.png";
import midas_event from "assets/images/projects/midas-event.png";
import mobi_event from "assets/images/projects/mobi-event.png";
import new_navat from "assets/images/projects/new-navat.png";
import number_speller from "assets/images/projects/number-speller.png";
import pharmacom from "assets/images/projects/pharmacom.png";
import portfolio from "assets/images/projects/portfolio.png";
import qazbooking from "assets/images/projects/qazbooking.png";
import qazaq_taxi from "assets/images/projects/qazaq-taxi.png";
import geonomix from "assets/images/projects/geonomix.png";
import qonys_toi from "assets/images/projects/qonys-toi.png";
import rakhat from "assets/images/projects/rakhat.png";
import rento from "assets/images/projects/rento.png";
import tahit from "assets/images/projects/tahit.png";
import tez_zhet from "assets/images/projects/tez-zhet.png";
import torgsoft from "assets/images/projects/torgsoft.png";
import unistory from "assets/images/projects/unistory.png";
import yaq from "assets/images/projects/yaq.png";
import youngs_store from "assets/images/projects/youngs-store.png";

const info = {
	name: "Serikuly Zhassulan",
	position: ["Senior Frontend Engineer", "Vue.js / Nuxt.js", "React / Next.js"],
	image: image,
	description: "Senior Frontend Engineer with 5+ years of commercial experience building production web applications, e-commerce platforms, booking systems and geoportals. Specialized in Vue.js, Nuxt.js and TypeScript, with experience in reusable frontend architecture, performance optimization, and REST API integration. Experienced in technical leadership, leading a 5-person engineering team, conducting code reviews, mentoring developers, establishing shared frontend standards, decomposing requirements and driving technical decisions.",
	logo: zs,
	phone: "+7 (775) 976-41-65",
	gmail: "serikuly.zhassulan@gmail.com",
	location: "Almaty, Kazakhstan",
	stats: [
		{
			key: "Companies worked",
			value: 4,
		}, {
			key: "Project works",
			value: "70+",
		}, {
			key: "Language profiency",
			value: 5,
		},
	],
	links: {
		phone: "tel:+77759764165",
		gmail: "mailto:serikuly.zhassulan@gmail.com",
		linkedin: "https://www.linkedin.com/in/serikulyzhassulan",
		hh: "https://hh.kz/applicant/resumes/5d166231ff0ae9aa040039ed1f4d6772377352",
		github: "https://github.com/zhassulaan",
		telegram: "https://msng.link/o/?young_flovver=tg",
		whatsapp: "https://wa.me/77759764165",
		facebook: "https://www.facebook.com/young.flovver",
		instagram: "https://instagram.com/zhassulaan__?igshid=YmMyMTA2M2Y",
	},
	documents: {
		cv: cv,
		recomendations: [
			{
				cheif: "Kentbayev A. E.",
				file: recommendation3,
				description: "Key Horse» - August, 2026 / Almaty",
			}, {
				cheif: "Sain S.",
				file: recommendation2,
				description: "«Athena plus» - May, 2022 / Almaty",
			}, {
				cheif: "Mammadov E.",
				file: recommendation1,
				description: "LLC «KasHIM» - August, 2021 / Atyrau",
			},
		],
	},
	projects: [
		{
			name: "KAGIS / Geonomix (iulytau.kz · iturkistan.kz · alauzo.kz · and 50+ regional geoportals across Kazakhstan)",
			link: "https://iulytau.kz",
			description: "A large-scale geospatial platform and digital twin solution developed for cities and regions across Kazakhstan. The platform brings together interactive maps, municipal and spatial data, digital registries, government services, monitoring tools, and operational information within a unified system.",
			stack: "Vue.js, Vuex, Docker, PostgreSQL, Django, Mapbox",
			image: geonomix
		}, {
			name: "Kostyum.kz — Men’s Fashion E-commerce Website",
			link: "https://kostyum.kz",
			description: "A modern e-commerce website for a men’s clothing retailer operating in Kazakhstan since 1998. The platform provides customers with an easy way to explore the brand’s product range, browse collections and categories, and discover detailed product information online. I developed the frontend using Nuxt.js, focusing on responsive design, reusable UI components, product catalog functionality, and a smooth user experience across desktop and mobile devices.",
			stack: "Nuxt.js",
			image: kostyum
		}, {
			name: "KazMedEngineering — Medical Equipment Service Website",
			link: "https://www.kme.kz",
			description: "A corporate website for KazMedEngineering, an authorized Philips Medical Systems service partner in Kazakhstan specializing in diagnostics, repair, and maintenance of professional medical equipment. I developed the frontend using Nuxt.js, creating a responsive and user-friendly interface for presenting the company’s services, expertise, and medical equipment solutions across desktop and mobile devices.",
			stack: "Nuxt.js, Swiper",
			image: kazmed
		}, {
			name: "ABI Construction — Construction Company Website",
			link: "https://abi-construction.kz",
			description: "A corporate website for ABI Construction, a design and construction company providing end-to-end services for residential and commercial projects, from initial planning and architectural design to construction and finishing. I worked on the development and customization of the website using WordPress, Vue.js, and PHP, implementing responsive user interfaces, dynamic functionality, and content management features to effectively present the company’s projects and services.",
			stack: "WordPress, Vue.js, PHP, SCSS",
			image: abi_construction
		}, {
			name: "Midas Event — Event Agency Website",
			link: "https://midasevent.kz",
			description: "A corporate website for Midas Event, an event agency providing end-to-end event management services, from concept development and planning to full-scale execution. I developed the frontend of the website using HTML, JavaScript, and CSS, creating responsive pages and interactive elements to showcase the agency’s services, projects, and event portfolio across desktop and mobile devices.",
			stack: "React",
			image: midas_event
		}, {
			name: "Melissa — Online Pharmacy & E-commerce Platform",
			link: "https://melissaapteka.kz",
			description: "A large-scale online pharmacy offering 13,000+ products, including medicines, vitamins, healthcare products, cosmetics, and products for children and mothers. I worked on the frontend of the e-commerce platform, developing responsive product catalogs, category navigation, search, filtering and sorting, product pages, shopping cart functionality, and integrations with backend services.",
			stack: "Nuxt.js",
			image: melissa
		}, {
			name: "TAHIT — Manufacturing Company Website",
			link: "https://tahit.kz",
			description: "A corporate website for TAHIT, a textile manufacturing company specializing in high-quality fabric printing and production using modern sublimation technologies and European manufacturing equipment. I developed the frontend of the website, creating a responsive and visually engaging interface to showcase the company’s production capabilities, technologies, products, and services. The website was optimized to provide a consistent user experience across desktop and mobile devices.",
			stack: "Vue.js",
			image: tahit
		}, {
			name: "Dostyk Trans Terminal — Logistics Terminal Website",
			link: "https://www.dtt.kz/",
			description: "A corporate website for Dostyk Trans Terminal, a modern logistics terminal located at the Dostyk–Alashankou border crossing, one of the key transportation links between Kazakhstan and China. The terminal provides container handling, storage, transshipment, and other logistics services.",
			stack: "Nuxt.js",
			image: dostyk_trans_terminal
		}, {
			name: "Dobraya — Online Pharmacy & E-commerce Website",
			link: "https://dobraya-apteka.kz",
			description: "An e-commerce website for Dobraya, a pharmacy chain operating in Almaty and the Almaty region since 1995, combining its physical pharmacy network with an online shopping experience. I worked on the frontend of the online pharmacy, developing responsive product catalogs, category navigation, search and filtering, product pages, and other e-commerce functionality to provide a convenient shopping experience across desktop and mobile devices.",
			stack: "HTML, JavaScript, SCSS, CSS, Bootstrap, jQuery",
			image: dobraya
		}, {
			name: "UniStory - AI & Web3 Business Platform",
			link: "https://unistory.netlify.app",
			description: "A modern digital platform focused on AI-powered business solutions, helping companies integrate artificial intelligence into their workflows and accelerate the development of web services, applications, and AI-driven products. I developed the frontend using React, implementing integration with a crypto wallet and building interfaces for retrieving, processing, and displaying dynamic data from backend APIs. The project involved managing wallet connection states, handling asynchronous data, and creating responsive, reusable UI components for a smooth user experience.",
			stack: "React.ts, Typescript",
			image: unistory
		}, {
			name: "QazBooking — Online Accommodation Booking Platform",
			link: "https://qazbooking.kz",
			description: "An online booking platform for hostels and recreation centers across Kazakhstan, allowing travelers to discover accommodation and complete reservations directly online instead of relying on phone calls or messaging. I worked on the frontend and booking functionality of the platform, implementing accommodation catalogs, search, filtering and sorting, user registration and authentication, property pages, and online booking flows, with integration to backend services.",
			stack: "1C Bitrix, PHP (HTML, JavaScript, SASS, CSS), Bootstrap",
			image: qazbooking
		}, {
			name: "Asia Mebel — Furniture Materials & Services Website",
			link: "https://asiamebel.com",
			description: "A commercial website for Asia Mebel, a retail and service company specializing in furniture materials, fittings, tools, and professional services such as cutting, milling, and PVC edge banding. I developed the frontend of the website, implementing a structured product catalog, category navigation, search, filtering and sorting, product pages, and service-related interfaces. The focus was on making a large range of materials and products easy to browse across desktop and mobile devices.",
			stack: "1C Bitrix, PHP (HTML, JavaScript, SASS, CSS), Bootstrap",
			image: azm_trade
		}, {
			name: "Pharmacom — Pharmacy & Healthcare Website",
			link: "https://pharma.com.kz",
			description: "A corporate website for Pharmacom, a healthcare brand founded in 1996 that operates a vaccination clinic in Almaty and a network of 55 pharmacies across major cities in Kazakhstan.",
			stack: "JavaScript, HTML, CSS, Bootstrap, jQuery",
			image: pharmacom
		}, {
			name: "NAVAT — Restaurant Landing Page",
			link: "https://newnavat.netlify.app",
			description: "A promotional landing page for NAVAT, a Central Asian restaurant brand known for its traditional teahouse-style cuisine inspired by the culinary traditions of Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, and the wider region. I developed the frontend of the landing page, creating a responsive and visually engaging interface to showcase the restaurant’s cuisine, menu, atmosphere, and brand identity across desktop and mobile devices.",
			stack: "JavaScript, HTML, CSS, jQuery",
			image: new_navat
		}, {
			name: "Event Invitation Website",
			link: "https://qonys-toi.netlify.app",
			description: "A custom event invitation website designed to provide guests with event details in a simple, modern, and visually engaging format. I developed the frontend using React, creating a responsive interface optimized for both mobile and desktop devices, with interactive elements and a smooth user experience.",
			stack: "React",
			image: qonys_toi
		}, {
			name: "MobiEvent — Mobile & Digital Finance Event Website",
			link: "https://mobievent.kz",
			description: "A website for MobiEvent, an industry event focused on the development of mobile services, digital payments, and financial technologies across Kazakhstan and the CIS region.",
			stack: "Nuxt.js",
			image: mobi_event
		}, {
			name: "Rento — Sports Facility Booking Platform",
			link: "https://rentokz.netlify.app",
			description: "A full-featured online platform for discovering and booking sports facilities and venues, connecting customers with facility owners through a single booking system. I developed the frontend using React, implementing separate user experiences for customers and facility hosts. The platform includes a custom administration panel that allows hosts to manage their facilities, availability, and booking-related information, while customers can explore available venues and complete reservations online. The project gave me experience building a more complex product with multiple user roles, administrative functionality, authentication, booking workflows.",
			stack: "React, Redux, Firebase",
			image: rento
		}, {
			name: "QAZAQ TAXI — Ride-Hailing Platform",
			link: "https://play.google.com/store/apps/details?id=com.user.qazaqtaxi&hl=en&gl=US",
			description: "A Kazakhstan-based ride-hailing platform designed to provide users with a fast and convenient way to request and manage taxi rides. I developed the frontend using Vue.js, Nuxt.js, and Vuetify, implementing responsive user interfaces and core ride-booking flows with a focus on a smooth experience across mobile and desktop devices.",
			stack: "Vue.js, Nuxt.js, Vuetify",
			image: qazaq_taxi
		}, {
			name: "Tez Zhet - Food & Grocery Delivery Platform",
			link: "https://apps.apple.com/sk/app/tezzhet/id6473077229",
			description: "A multi-service delivery application that allows users to order food, groceries, and everyday products from local restaurants and stores through a single platform. I worked on the frontend development of the application, implementing product and restaurant catalogs, search and filtering, shopping cart and checkout flows, user authentication, delivery address management, order placement, order history, and integration with backend APIs. The platform was designed with a mobile-first approach, focusing on simple navigation and a smooth ordering experience across different devices.",
			stack: "Nuxt.js",
			image: tez_zhet
		}, {
			name: "YAQ — Outdoor & Sports E-commerce Platform",
			link: "https://yaq.kz",
			description: "An e-commerce website for YAQ, a retailer specializing in professional clothing, footwear, accessories, and equipment for running, hiking, camping, tourism, and other outdoor activities. I developed the frontend of the online store, implementing product catalogs, category navigation, search, filtering and sorting, product pages, and shopping functionality. I focused on building a responsive and user-friendly shopping experience that makes it easy to navigate a large product assortment across desktop and mobile devices.",
			stack: "React",
			image: yaq
		}, {
			name: "M1 Service — Automotive Service Website",
			link: "https://m1-service.netlify.app",
			description: "A corporate website for M1 Service, an established network of automotive service centers providing vehicle maintenance, diagnostics, and repair services.",
			stack: "Nuxt.js, TypeScript",
			image: m1_service
		}, {
			name: "Art Gallery — React Product Gallery",
			link: "https://art-galery.netlify.app",
			description: "One of my first React projects, created while learning how to build interactive and component-based web applications. The application displays a collection of products that users can browse, search, and add to their favorites. I implemented reusable React components, dynamic search functionality, favorites management, and interactive UI updates based on user actions. This project helped me gain practical experience with React fundamentals, component architecture, state management, event handling, filtering data, and building responsive user interfaces.",
			stack: "React",
			image: art_galery
		}, {
			name: "Rakhat Qazaqstan Óneri — Cultural Digital Project",
			link: "https://rakhat.a-lux.dev",
			description: "A digital project created for LOTTE Rakhat to showcase the richness of contemporary Kazakh culture and introduce users to Kazakhstan’s art, artists, and distinctive creative heritage.",
			stack: "Vue.js",
			image: rakhat
		}, {
			name: "AsiaCredit Bank — Contact Center Website",
			link: "https://asiacreditbank.kz",
			description: "A web solution for AsiaCredit Bank’s Contact Center, designed to provide individuals and businesses with convenient access to information about the bank’s products, services, and customer support. I worked on the frontend implementation and maintenance of the website, developing responsive interfaces and interactive functionality using HTML, JavaScript, and SCSS, with PHP used on the server side.",
			stack: "PHP (HTML, JavaScript, SCSS, CSS)",
			image: asia_credit_bank
		}, {
			name: "IKeruen — Logistics & Transportation Website",
			link: "https://ikeruen.kz",
			description: "A corporate website for IKeruen, a logistics company providing freight transportation services for different types and volumes of cargo.",
			stack: "Nuxt.js",
			image: ikeruen
		}, {
			name: "TORGSOFT — Business Automation Software Website",
			link: "https://torgsoft.netlify.app",
			description: "One of my first commercial web development projects, created for TORGSOFT — a business automation software company providing solutions for managing sales, inventory, operations, and other day-to-day business processes. I worked on the frontend of the website, implementing responsive pages and UI components while gaining early hands-on experience working with a real production project and an existing commercial codebase. This project was an important step in my transition from learning web development to building and maintaining software for real businesses.",
			stack: "JavaScript, HTML, CSS",
			image: torgsoft
		}, {
			name: "Check Market — Retail Automation & Equipment Website",
			link: "https://github.com/zhassulaan/check-market",
			description: "A commercial website for Check Market, a company providing retail and business automation solutions, including cash register equipment, security systems, installation and maintenance services, and related consumables. I developed the frontend of the website, implementing a structured product catalog, category navigation, search, filtering and sorting, product pages, and service-related interfaces. The focus was on making a broad range of equipment and business solutions easy to discover and navigate across desktop and mobile devices.",
			stack: "Next.js",
			image: check_market
		}, {
			name: "Young’s Store — E-commerce Website",
			link: "https://youngs-store.netlify.app",
			description: "One of my very first web development projects, created while I was learning the fundamentals of frontend development and turning my programming knowledge into a complete working website. I built an online store for stylish Korean clothing where users can browse products, view product information, place orders, and submit job applications. The website was built with a strong focus on responsive design, providing a consistent experience across desktop, tablet, and mobile devices. This project played an important role in my early development journey, helping me gain practical experience with HTML, CSS, JavaScript, responsive layouts, UI implementation, and building a complete website from scratch.",
			stack: "JavaScript, HTML, CSS, Bootstrap, jQuery",
			image: youngs_store
		}, {
			name: "Personal Portfolio — Developer Website",
			link: "https://zhassulan.netlify.app",
			description: "A personal portfolio website designed and developed to showcase my professional experience, technical skills, education, projects, and development journey in a more interactive and engaging format than a traditional resume. I built the website to serve as a central place where recruiters, companies, and other developers can explore my background, technologies I work with, and selected commercial and personal projects without relying solely on a PDF resume. The website is fully responsive and designed to provide a clean and consistent experience across desktop, tablet, and mobile devices.",
			stack: "JavaScript, HTML, CSS, jQuery",
			image: portfolio
		}, {
			name: "Age Counter — Real-Time Age Calculator",
			link: "https://zhassulaan.github.io/AgeCounter",
			description: "One of my early JavaScript projects, created while practicing date manipulation, calculations, and dynamic DOM updates. The application calculates a user’s exact age based on their birth date and displays how long they have lived in years, months, days, hours, minutes, and seconds, updating the results dynamically. This project helped me strengthen my understanding of JavaScript date handling, user input validation, real-time calculations, and DOM manipulation while building a simple responsive user interface.",
			stack: "JavaScript, HTML, CSS, moment.js",
			image: age_counter
		}, {
			name: "Number speller",
			link: "https://zhassulaan.github.io/Number-speller",
			description: "Number to word counter converter in three languages.",
			stack: "JavaScript, HTML, CSS",
			image: number_speller
		},
	],
	experience: [
		{
			id: "key_horse",
			name: "Key Horse",
			position: "Senior Full-Stack Developer / Frontend Team Lead",
			icon: "fa-solid fa-server",
			logo: key_horse,
			date: "June, 2022 - August, 2026 / Almaty",
			technologies: "Vue.js, Vuex, Django, PostgreSQL, Mapbox, Docker, ESLint",
			responsibilities: [
				"Led frontend development within a 5-person engineering team, coordinating delivery, decomposing requirements, assigning tasks, reviewing code, mentoring four junior developers, and providing technical guidance.",
				"Took ownership of 4 regional geoportals from initial implementation to production for Ulytau, Kyzylorda, Kostanay and Turkistan, delivering initial versions within 2–3 month development cycles and continuing post-launch feature development.",
				"Developed and maintained 50+ production geoportals and digital twin solutions used by government and municipal organizations across Kazakhstan for city monitoring, analytics, and data-driven decision-making, using Vue.js, Mapbox, Django REST Framework and PostgreSQL.",
				"Designed and implemented complex reusable Mapbox-based interfaces for visualization and interaction with large geospatial and municipal datasets, integrating REST APIs and Django/PostgreSQL services for data-intensive functionality.",
				"Optimized search and filtering across data-heavy geospatial catalogs containing hundreds of thousands of map objects, improving lookup efficiency and UI responsiveness through more efficient frontend data traversal.",
				"Introduced shared frontend coding standards and BEM methodology, trained developers on the new conventions, and drove team-wide adoption, improving consistency and maintainability across a previously fragmented codebase.",
			],
		}, {
			id: "a_lux",
			name: "A - Lux",
			position: "Frontend Developer",
			icon: "fa-brands fa-vuejs",
			logo: a_lux,
			date: "March, 2022 - August, 2022 / Almaty",
			technologies: "Nuxt.js, Vue.js, Vuex, Pinia, TypeScript",
			responsibilities: [
				"Developed and maintained frontend functionality across multiple commercial projects using Vue.js and Nuxt.js, including e-commerce, food delivery, healthcare, and corporate web platforms.",
				"Led frontend development of a major city-wide food delivery platform built with Nuxt.js, delivering the end-to-end customer journey from restaurant discovery and search to checkout, payments, delivery, and order tracking.",
				"Collaborated within a 30+ person engineering organization alongside frontend and backend teams, contributing to shared production codebases and coordinated releases.",
				"Resolved complex frontend issues and helped unblock development and delivery across multiple ongoing projects.",
			],
		}, {
			id: "athena_plus",
			name: "Athena Plus",
			position: "Frontend Developer",
			icon: "fa-brands fa-react",
			logo: athena_plus,
			date: "June, 2021 - May, 2022 / Almaty",
			technologies: "React, React Native, Next.js, Redux",
			responsibilities: [
				"Owned frontend delivery as the primary frontend engineer in a 6–7 person cross-functional team, collaborating directly with product/project manager, backend engineer, designer to deliver client projects from concept to production.",
				"Independently architected and delivered multiple commercial applications using React, Next.js, and Redux across e-commerce, travel, retail, hospitality, logistics and healthcare.",
				"Built reusable catalog, search, filtering, sorting and navigation functionality across multiple projects.",
				"Developed the frontend of Qazbooking.kz, an accommodation booking platform, implementing authentication, accommodation search, and booking flows.",
			],
		}, {
			id: "kaskhim",
			name: "LLC «KasKhim»",
			position: "Software Engineer Intern",
			icon: "fa-solid fa-laptop-code",
			logo: kashim,
			date: "January, 2021 - March, 2021 / Atyrau",
			technologies: "JavaScript, HTML, CSS",
			responsibilities: [
				"Implemented UI improvements and missing functionality using JavaScript, HTML, and CSS, resolving layout, usability, and cross-page consistency issues.",
				"Debugged and tested the existing codebase, identifying frontend issues and delivering fixes and incremental improvements.",
			],
		},
	],
	skills: [
		{
			id: "frontend",
			title: "Frontend",
			subtitle: "Aproximately 8 years",
			icon: "fa-solid fa-code",
			list: [
				{
					key: "vue_nuxt",
					name: "Vue.js / Nuxt.js (Vuex)",
					percentage: 100,
				}, {
					key: "react_next",
					name: "React / Next .js (Redux)",
					percentage: 95,
				}, {
					key: "pinia",
					name: "Pinia",
					percentage: 100,
				}, {
					key: "ts",
					name: "TypeScript",
					percentage: 100,
				}, {
					key: "js",
					name: "JavaScript",
					percentage: 100,
				}, {
					key: "html",
					name: "HTML",
					percentage: 100,
				}, {
					key: "css",
					name: "CSS",
					percentage: 100,
				}
			]
		}, {
			id: "backend_database",
			title: "Backend + DataBase",
			subtitle: "More than 4 years",
			icon: "fa-solid fa-clapperboard",
			list: [
				{
					key: "python",
					name: "Python",
					percentage: 100,
				}, {
					key: "django",
					name: "Django",
					percentage: 80,
				}, {
					key: "postgre_sql",
					name: "PostgreSQL",
					percentage: 100,
				}, {
					key: "pl_sql",
					name: "Oracle PL / SQL",
					percentage: 85,
				}, {
					key: "my_sql",
					name: "MySQL",
					percentage: 85,
				}
			]
		}, {
			id: "tools",
			title: "Tools",
			subtitle: "More than 7 years",
			icon: "fa-solid fa-object-group",
			list: [
				{
					key: "vite",
					name: "Vite",
					percentage: 100,
				}, {
					key: "git",
					name: "Git",
					percentage: 100,
				}, {
					key: "docker",
					name: "Docker",
					percentage: 80,
				}, {
					key: "eslint",
					name: "ESLint",
					percentage: 100,
				}, {
					key: "figma",
					name: "Figma",
					percentage: 100,
				}, {
					key: "jira",
					name: "Atlassian Jira",
					percentage: 95,
				}
			]
		}, {
			id: "languages",
			title: "Languages",
			subtitle: "From birth",
			icon: "fa-solid fa-language",
			list: [
				{
					key: "english",
					name: "English",
					level: "Upper-Intermediate",
					percentage: 80,
					link: "https://drive.google.com/file/d/1FDTru0F0fmUbImlWmFKx1PQ9QbS0zvqR",
				}, {
					key: "kazakh",
					name: "Kazakh",
					level: "Native",
					percentage: 100,
					link: "",
				}, {
					key: "russian",
					name: "Russian",
					level: "Fluent",
					percentage: 95,
					link: "",
				}, {
					key: "turkish",
					name: "Turkish",
					level: "Upper-Intermediate",
					percentage: 80,
					link: "",
				}, {
					key: "chinese",
					name: "Chinese",
					level: "Conversant",
					percentage: 40,
					link: "https://drive.google.com/file/d/1Nc2r3H21SrN_16sO473fxIXHeC-gScnL",
				}
			]
		}
	],
	education: [
		{
			title: "National School - Gymnasium No. 13",
			description: "Primary School - Atyrau",
			date: "2008 - 2014"
		}, {
			title: "Kazakh - Turkish Lyceum",
			description: "High School - Atyrau",
			date: "2014 - 2019"
		}, {
			title: "Suleyman Demirel University",
			description: "Bachelor of «Engineering and Natural Sciences» - Almaty",
			date: "2019 - 2023"
		}, {
			title: "HTML, CSS, and JS for Web Developers",
			description: "Coursera",
			date: "May - 2021"
		}, {
			title: "Front - End Web Development with React",
			description: "Coursera",
			date: "April - 2022"
		}, {
			title: "Python (Basic) Certificate",
			description: "HackerRank",
			date: "June - 2022"
		}, {
			title: "Java (Basic) Certificate",
			description: "HackerRank",
			date: "June - 2022"
		}, {
			title: "SQL (Basic) Certificate",
			description: "HackerRank",
			date: "June - 2022"
		}
	],
	achievement: [
		{
			title: "Olympiad in Mathematics",
			link: "https://drive.google.com/file/d/1FhD5mtBb9VX-Fv1ujiogRi6cYO8xd2DT",
			description: "II place",
			date: "2013",
		}, {
			title: "International Competition «Kenguru - Math for all»",
			link: "https://drive.google.com/file/d/1y_I3_SPkK8VtgmOfLqFOHdAPU7nudGP4",
			description: "III place",
			date: "2016",
		}, {
			title: "Regional Olympiad in Informatics",
			link: "",
			description: "I place",
			date: "2017",
		}, {
			title: "Robotics",
			link: "https://drive.google.com/file/d/1d5cTWh0y8LDrCVYhXj_5GZlXAKT8dGkN",
			description: "I place",
			date: "2017",
		}, {
			title: "International Competition «Infomatrix»",
			link: "https://drive.google.com/file/d/1u3UMHzxXUi6G4kEWZPkPYKewY3i_lpyJ",
			description: "Silver medal",
			date: "2018",
		}, {
			title: "Euler Olympiad in Mathematics",
			link: "",
			description: "II place",
			date: "2018",
		}, {
			title: "«IELTS»",
			link: "",
			description: "7 Band",
			date: "2018",
		}, {
			title: "Dostyk Intellectual Olympiad",
			link: "https://drive.google.com/file/d/1yZUrKA01CuQJWMqfKT1kei4B9BJQdpIb",
			description: "I place",
			date: "2018",
		}, {
			title: "Certificate of Chinese Proficiency",
			link: "https://drive.google.com/file/d/16B_xxDNRz7HviOhAtrDwvILR6Y7X105j",
			description: "II level",
			date: "2019",
		}, {
			title: "Secondary Education",
			link: "https://drive.google.com/file/d/1QS2dibgwZRQ8Va0kIf20Cpmq9_9G3JED",
			description: "Red diploma",
			date: "2019",
		}, {
			title: "Jaxart 2019",
			link: "https://drive.google.com/file/d/1xL7XQZ-ILjUSxEFRRmfsVkZ4v4Nj7zq0",
			description: "Participation",
			date: "2019",
		}, {
			title: "Certificate of English Proficiency",
			link: "https://drive.google.com/file/d/1i2wlS6PG-HIQpwW5mwjoykEHuBbPo_ZW",
			description: "Upper-Intermediate (B2)",
			date: "2022",
		}, {
			title: "Film Fest",
			link: "https://drive.google.com/file/d/1Il_qnjWe3R2pNkpLVYY_hEW4Oduu-uRH",
			description: "III place",
			date: "2022",
		}, {
			title: "Bachelor degree",
			link: "https://drive.google.com/file/d/1JDFHy1AvlL2WrH0Ey63WJGy2mw8RON1B",
			description: "Red diploma",
			date: "2023",
		}
	],
}

export default info;
