import { Component } from '@angular/core';
import { RATINGS, repoUrl, siteUrl, STUDENTS } from './students-2026.data';

@Component({
	selector: 'app-students-2026',
	templateUrl: './students-2026.html',
	styleUrl: './students-2026.css',
})
export class Students2026 {
	readonly students = STUDENTS;
	readonly ratings = RATINGS;
	readonly repoUrl = repoUrl;
	readonly siteUrl = siteUrl;
}
