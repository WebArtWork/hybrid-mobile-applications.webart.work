import { Component } from '@angular/core';
import { RATINGS, repoUrl, siteUrl, STUDENTS, type Student } from './students-2026.data';

const FIRST = 'Olexandra680';
const cvRank = (s: Student) => (s.github === FIRST ? -1 : s.cvDone === 'plus' ? 0 : s.cvDone ? 1 : 2);

@Component({
	selector: 'app-students-2026',
	templateUrl: './students-2026.html',
	styleUrl: './students-2026.css',
})
export class Students2026 {
	readonly legend = [
		{ medal: '○', title: 'Без медалі', text: 'CV-сайт не готовий.' },
		{ medal: RATINGS.bronze.medal, title: 'Бронза', text: 'CV-сайт готовий.' },
		{
			medal: RATINGS.silver.medal,
			title: 'Срібло',
			text: 'у SPA-застосунку є маршрутизація.',
		},
		{ medal: RATINGS.gold.medal, title: 'Золото', text: 'сторінки застосунку працюють.' },
	];
	/** Sherepera Oleksandra pinned first; then CV check with plus, then plain check, then the rest; each group A–Z by name. */
	readonly students = [...STUDENTS].sort((a, b) => cvRank(a) - cvRank(b) || a.name.localeCompare(b.name));
	readonly ratings = RATINGS;
	readonly repoUrl = repoUrl;
	readonly siteUrl = siteUrl;
}
