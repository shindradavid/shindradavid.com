<script lang="ts">
	import { Seo } from '$lib/components';
	import {
		Linux,
		Figma,
		Svelte,
		NestJS,
		Postgresql,
		React,
		Javascript,
		Nodejs,
		Code,
		PaintBrush,
		CloudComputing,
		Redis
	} from '$lib/icons';
	import { getWhatsAppUrl } from '$lib/site';

	const skills = [
		{
			name: 'Languages',
			icon: Code,
			subSkills: [
				{
					name: 'JavaScript',
					icon: Javascript
				}
			]
		},
		{
			name: 'Frontend development',
			icon: Code,
			subSkills: [
				{
					name: 'Svelte',
					icon: Svelte
				},
				{
					name: 'React',
					icon: React
				},
				{
					name: 'React Native',
					icon: React
				}
			]
		},
		{
			name: 'Backend development',
			icon: Code,
			subSkills: [
				{
					name: 'NodeJS',
					icon: Nodejs
				},
				{
					name: 'NestJS',
					icon: NestJS
				},
				{
					name: 'PostgreSQL',
					icon: Postgresql
				},
				{
					name: 'Redis',
					icon: Redis
				}
			]
		},
		{
			name: 'Cloud & DevOps',
			icon: CloudComputing,
			subSkills: [
				{
					name: 'Linux',
					icon: Linux
				}
			]
		},
		{
			name: 'Design',
			icon: PaintBrush,
			subSkills: [
				{
					name: 'Figma',
					icon: Figma
				}
			]
		}
	];
</script>

<Seo
	title="About Me | Shindra David"
	description="Learn more about my journey from business school to full-stack development. I’m passionate about coding, design, and building software that solves real problems and inspires creativity."
/>

<main class="container">
	<header class="page-header">
		<h1>About me</h1>

		<p>
			Hi there, I’m Shindra David, a self-taught full-stack developer and graphic designer based in
			Uganda with a passion for creating dynamic web and mobile applications.
		</p>
	</header>

	<section class="my-journey">
		<h2>My Journey into Coding</h2>
		<p>
			I did not begin with a technical background. My journey into programming started unexpectedly
			while I was in business school, taking a digital marketing class, when our lecturer introduced
			the concept of websites as powerful marketing tools. That single lesson sparked my curiosity.
			How were websites built? What made them so effective? I wanted to understand more.
		</p>

		<p>
			As I researched the subject, I stumbled upon the basics of web development—starting with HTML.
			The more I learned, the more fascinated I became. I soon discovered Python, and before I knew
			it, I was deep into the Django framework and PostgreSQL, exploring how backend systems worked.
		</p>

		<p>
			But my journey didn’t stop there. The real turning point came when I found JavaScript. Its
			flexibility and vast ecosystem opened up a whole new world for me. I quickly transitioned to
			working with Svelte, and SvelteKit for frontend development and NestJS, Node.js, and
			PostgreSQL for backend applications.
		</p>

		<p>
			More recently, I started learning React, mostly as a stepping stone into React Native, since I
			wanted to expand my skills into mobile app development.
		</p>

		<p>
			Alongside my development journey, I’ve also ventured into the world of design. I began
			learning Figma, and over time, I’ve developed the skills to create flyers and other digital
			materials. I’m excited to explore UI design in the future and create beautiful, functional
			user interfaces that enhance user experience.
		</p>

		<p>
			This journey started at the end of 2020, during the COVID-19 lockdown. With plenty of free
			time, I fully immersed myself in coding, spending countless hours learning, building projects,
			and refining my skills. What began as a casual interest turned into a deep passion—and
			ultimately, a career as a full-stack developer.
		</p>
	</section>

	<section class="skills">
		<header class="skills__header">
			<h2>Skills</h2>
			<p>Here is a peek under the hood of my tech toolbox.</p>
		</header>

		<div class="skills__container">
			{#each skills as { name, icon: Icon, subSkills }}
				<article class="skill">
					<header class="skill__header">
						<span class="icon">
							<Icon />
						</span>
						<h2 class="name">{name}</h2>
					</header>

					<div class="skill__sub_skills">
						{#each subSkills as { name, icon: Icon }}
							<div class="sub_skill">
								<span class="icon">
									<Icon />
								</span>

								<p class="name">{name}</p>
							</div>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="about-cta">
		<h2>Need a practical digital solution for your business?</h2>
		<p>Tell me what you are trying to improve and I’ll help identify the right next step.</p>
		<a href={getWhatsAppUrl()} class="btn primary" target="_blank" rel="noopener noreferrer"
			>Start a conversation</a
		>
	</section>
</main>

<style lang="scss">
	@use '../../styles/utils';

	main {
		section > p {
			margin-bottom: var(--spacing-lg);
		}

		.page-header {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: var(--spacing-lg) 0;
			margin: var(--spacing-xl) auto;

			@include utils.respond-to('md-screens') {
				width: 40vw;
				margin: var(--spacing-xl) auto;
			}

			p {
				text-align: center;
			}
		}

		.my-journey {
			@include utils.respond-to('md-screens') {
				width: 50vw;
				margin: 0 auto;
			}
		}

		.skills {
			@include utils.respond-to('md-screens') {
				width: 50vw;
				margin: 0 auto;
			}

			&__header {
				padding-bottom: var(--spacing-lg);
				display: flex;
				align-items: center;
				flex-direction: column;

				p {
					text-align: center;
				}
			}

			&__container {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
				gap: var(--spacing-md);

				.skill {
					padding: var(--spacing-xl);
					background-color: var(--clr-bg-secondary);
					border-radius: var(--radius-base);

					&__header {
						display: flex;
						align-items: center;
						gap: var(--spacing-sm);
						margin-bottom: var(--spacing-md);

						.icon {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: var(--spacing-sm);
							border-radius: var(--radius-sm);
							background-color: #414141;
							font-size: 32px;
							height: fit-content;
						}

						.name {
							font-size: var(--fs-base);
						}
					}

					&__sub_skills {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						gap: var(--spacing-sm);

						.sub_skill {
							padding: var(--spacing-xs) var(--spacing-md);
							display: flex;
							align-items: center;
							gap: var(--spacing-sm);
							border: 1px solid #646464ff;
							border-radius: 32px;
							width: fit-content;

							.icon {
								line-height: 1;
								font-size: 18px;
							}

							.name {
								font-size: var(--fs-sm);
								font-weight: var(--fw-semibold);
							}
						}
					}
				}
			}
		}

		.about-cta {
			max-width: 760px;
			margin: var(--spacing-7xl) auto;
			padding: var(--spacing-xl);
			text-align: center;
			background: var(--clr-bg-secondary);
			border-radius: var(--radius-sm);

			h2 {
				color: var(--clr-txt-primary-on-bg-secondary);
				margin-bottom: var(--spacing-sm);
			}
		}
	}
</style>
