import { Component } from '@angular/core';
import { RATINGS, repoUrl, siteUrl, STUDENTS } from './students-2026.data';

@Component({
	selector: 'app-students-2026',
	templateUrl: './students-2026.html',
	styleUrl: './students-2026.css',
})
export class Students2026 {
	readonly legend = [
		{ medal: '○', title: 'Без медалі', text: 'CV-сайт ще не готовий або не опублікований.' },
		{ medal: RATINGS.bronze.medal, title: 'Бронза', text: 'CV-сайт готовий.' },
		{
			medal: RATINGS.silver.medal,
			title: 'Срібло',
			text: 'до SPA-застосунку додано маршрутизацію.',
		},
		{ medal: RATINGS.gold.medal, title: 'Золото', text: 'сторінки застосунку працюють.' },
	];
	readonly students = STUDENTS;
	readonly ratings = RATINGS;
	readonly repoUrl = repoUrl;
	readonly siteUrl = siteUrl;
}
