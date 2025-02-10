import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  pageTitle: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      // Leer el título de la ruta activa
      const routeData = this.route.firstChild?.snapshot?.data;
      if (routeData && routeData['title']) {
        this.pageTitle = routeData['title']; // Actualizar el título dinámicamente
        this.titleService.setTitle(this.pageTitle); // Opcional: actualizar el título de la página
      }
    });
  }

  toLogin(){
    this.router.navigate(['/auth/login']);
  }


}
