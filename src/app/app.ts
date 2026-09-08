import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Seo } from './shared/seo/seo';
import { SeoImage } from './shared/seo/seo-images';

@Component({
	imports: [RouterOutlet],
	selector: 'app-root',
	styleUrl: './app.css',
	templateUrl: './app.html',
})
export class App {
	constructor() {
		const router = inject(Router);
		const seo = inject(Seo);

		router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				takeUntilDestroyed(),
			)
			.subscribe(() => {
				let route = router.routerState.snapshot.root;
				while (route.firstChild) route = route.firstChild;

				const path = router.url.split('?')[0].split('#')[0].replace(/^\//, '');
				const title = route.title ?? '';
				const description = (route.data['description'] as string | undefined) ?? '';
				seo.update(path, title, description, route.data['image'] as SeoImage | undefined);
			});
	}
}
