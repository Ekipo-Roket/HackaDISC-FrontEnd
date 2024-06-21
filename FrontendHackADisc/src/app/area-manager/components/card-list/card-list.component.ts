import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';

@Component({
  selector: 'area-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards: ResponseWorkersArea[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.loadCards();
    setInterval(() => this.loadCards(), 300000); // Actualiza cada 5 minutos (300000 ms)
  }

  loadCards() {
    this.cardService.getRecentCards().subscribe(cards => this.cards = cards);
  }
}
