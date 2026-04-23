import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';

import styles from './index.module.css';

function HeroSection() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx('hero--primary hero', styles.hero)}>
			<div className="container">
				<Heading as="h1" className={styles.heroTitle}>
					{siteConfig.title}
				</Heading>
				<p className={styles.heroTagline}>
					Self-hosted media management — movies, TV, live channels, and streaming in a single app.
				</p>
				<div className={styles.searchWrap}>
					<SearchBar />
				</div>
			</div>
		</header>
	);
}

function QuickStartStrip() {
	const steps = [
		{ label: 'Install', description: 'Docker setup', href: '/docs/getting-started/installation' },
		{ label: 'Configure', description: 'TMDB & clients', href: '/docs/getting-started/initial-setup' },
		{ label: 'Add Media', description: 'Movies & TV', href: '/docs/getting-started/adding-media' }
	];

	return (
		<section className={styles.quickStart}>
			<div className="container">
				<div className={styles.quickSteps}>
					{steps.map((step, idx) => (
						<Link key={idx} to={step.href} className={styles.quickStep}>
							<span className={styles.quickStepNumber}>{idx + 1}</span>
							<div>
								<span className={styles.quickStepLabel}>{step.label}</span>
								<span className={styles.quickStepDesc}>{step.description}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

function SectionsDirectory() {
	const sections = [
		{
			title: 'Getting Started',
			description: 'Install Cinephage, run initial setup, and add your first media.',
			href: '/docs/getting-started',
			links: [
				{ label: 'Installation', href: '/docs/getting-started/installation' },
				{ label: 'Initial Setup', href: '/docs/getting-started/initial-setup' },
				{ label: 'Adding Media', href: '/docs/getting-started/adding-media' }
			]
		},
		{
			title: 'Guides',
			description: 'Configure download clients, quality profiles, subtitles, and more.',
			href: '/docs/guides',
			links: [
				{ label: 'Download Clients', href: '/docs/guides/configure/download-clients' },
				{ label: 'Quality Profiles', href: '/docs/guides/configure/quality-profiles' },
				{ label: 'Subtitles', href: '/docs/guides/configure/subtitles' }
			]
		},
		{
			title: 'Reference',
			description: 'API docs, environment variables, database schema, and YAML formats.',
			href: '/docs/reference',
			links: [
				{ label: 'Environment Variables', href: '/docs/reference/configuration/environment-variables' },
				{ label: 'API Endpoints', href: '/docs/reference/api/endpoints-overview' },
				{ label: 'Indexer YAML', href: '/docs/reference/yaml/indexer-definitions' }
			]
		},
		{
			title: 'Explanation',
			description: 'Architecture, core concepts, quality scoring, and design decisions.',
			href: '/docs/explanation',
			links: [
				{ label: 'Architecture', href: '/docs/explanation/architecture' },
				{ label: 'Quality Scoring', href: '/docs/explanation/quality-scoring' },
				{ label: 'Workers & Tasks', href: '/docs/explanation/workers-and-tasks' }
			]
		},
		{
			title: 'Support',
			description: 'FAQ, release notes, roadmap, and troubleshooting.',
			href: '/docs/support',
			links: [
				{ label: 'FAQ', href: '/docs/support/faq' },
				{ label: 'Releases', href: '/docs/support/releases' },
				{ label: 'Troubleshooting', href: '/docs/guides/deploy/troubleshooting' }
			]
		}
	];

	return (
		<section className={styles.sections}>
			<div className="container">
				<div className={styles.sectionsGrid}>
					{sections.map((section, idx) => (
						<div key={idx} className={styles.sectionBlock}>
							<Link to={section.href} className={styles.sectionTitle}>
								<Heading as="h2">{section.title}</Heading>
							</Link>
							<p className={styles.sectionDescription}>{section.description}</p>
							<ul className={styles.sectionLinks}>
								{section.links.map((link, linkIdx) => (
									<li key={linkIdx}>
										<Link to={link.href}>{link.label}</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function CommunityStrip() {
	return (
		<section className={styles.community}>
			<div className="container">
				<div className={styles.communityLinks}>
					<Link to="https://discord.gg/scGCBTSWEt">Discord</Link>
					<Link to="https://github.com/MoldyTaint/Cinephage">GitHub</Link>
					<Link to="https://github.com/MoldyTaint/Cinephage/issues">Issues</Link>
				</div>
			</div>
		</section>
	);
}

export default function Home(): ReactNode {
	return (
		<Layout
			title="Cinephage Documentation"
			description="Self-hosted media management — movies, TV, live channels, and streaming in a single app."
		>
			<HeroSection />
			<main>
				<QuickStartStrip />
				<SectionsDirectory />
				<CommunityStrip />
			</main>
		</Layout>
	);
}
