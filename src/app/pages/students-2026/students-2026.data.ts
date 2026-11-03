export type Rating = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Student {
	/** Full name in English, as the student gave it in chat. */
	name: string;
	github: string;
	/** CV website repo, the repo name is also its domain. */
	cv: string;
	/** Application project, the repo name is also its domain. */
	app?: { repo: string; title: string };
	rating?: Rating;
}

export const RATINGS: Record<Rating, { medal: string; label: string }> = {
	bronze: { medal: '🥉', label: 'Bronze medal' },
	silver: { medal: '🥈', label: 'Silver medal' },
	gold: { medal: '🥇', label: 'Gold medal' },
	platinum: { medal: '🏆', label: 'Platinum trophy' },
};

const ORG = 'https://github.com/IT-Kamianets';

export const repoUrl = (repo: string) => `${ORG}/${repo}`;
export const siteUrl = (repo: string) => `https://${repo}`;

export const STUDENTS: Student[] = [
	{
		name: 'Bekterev Oleksandr',
		github: 'artosich',
		cv: 'bekterev-oleksandr.itkamianets.com',
		rating: 'bronze',
		app: { repo: 'mysport.itkamianets.com', title: 'MySport' },
	},
	{
		name: 'Bodyk Maksym',
		github: 'SakuraByte',
		cv: 'bodyk-maksym.itkamianets.com',
		rating: 'bronze',
		app: { repo: 'obsidian-ai-hub.itkamianets.com', title: 'Obsidian AI Hub' },
	},
	{
		name: 'Furman Kamila',
		github: 'Kamila-k2',
		cv: 'furman-kamila.itkamianets.com',
	},
	{
		name: 'Khmeliovska Daria',
		github: 'drswks',
		cv: 'khmeliovska-daria.itkamianets.com',
		app: { repo: 'hairlab.itkamianets.com', title: 'HairLab' },
	},
	{
		name: 'Korennyi Yurii',
		github: 'korennyi228',
		cv: 'korennyi-yurii.itkamianets.com',
		app: { repo: 'bikepath.itkamianets.com', title: 'BikePath' },
	},
	{
		name: 'Kushnir Daniil',
		github: 'Kushnir-Daniil',
		cv: 'kushnir-daniil.itkamianets.com',
		rating: 'silver',
		app: { repo: 'cyber-detective.itkamianets.com', title: 'Cyber Detective' },
	},
	{
		name: 'Liashuk Nikita',
		github: 'lyashuknk69',
		cv: 'liashuk-nikita.itkamianets.com',
		rating: 'bronze',
		app: { repo: 'fpv.itkamianets.com', title: 'FPV Drone Academy' },
	},
	{
		name: 'Melnyk Dmytro',
		github: 'DmitroMELNYK',
		cv: 'melnyk-dmytro.itkamianets.com',
		app: { repo: 'callout.itkamianets.com', title: 'Callout' },
	},
	{
		name: 'Oliinyk Kostia',
		github: 'olinykkostia',
		cv: 'kostia-oliinyk.itkamianets.com',
		rating: 'silver',
		app: { repo: 'spotsport.itkamianets.com', title: 'SpotSport' },
	},
	{
		name: 'Poliuliak Maksim',
		github: 'Maxim2202',
		cv: 'poliuliak-maksim.itkamianets.com',
	},
	{
		name: 'Riabyi Vadim',
		github: 'Vadim1287',
		cv: 'vadim-riabyi.itkamianets.com',
	},
	{
		name: 'Sherepera Oleksandra',
		github: 'Olexandra680',
		cv: 'oleksandra-sherepera.itkamianets.com',
		rating: 'bronze',
		app: { repo: 'sceneseek.itkamianets.com', title: 'SceneSeek' },
	},
	{
		name: 'Skyrdenko Oleksandr',
		github: 'Sant1agoAm1gos',
		cv: 'oleksandr-skyrdenko.itkamianets.com',
		rating: 'silver',
		app: { repo: 'yump.itkamianets.com', title: 'YUMP' },
	},
	{
		name: 'Tarasenko Kateryna',
		github: 'kate1rina19',
		cv: 'tarasenko-kateryna.itkamianets.com',
		rating: 'bronze',
		app: { repo: 'math.itkamianets.com', title: 'Math' },
	},
];
