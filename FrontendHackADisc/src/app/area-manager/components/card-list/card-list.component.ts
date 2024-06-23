import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ResponseWorkersArea } from '../../interfaces/ResponseWorkersArea';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'area-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards: ResponseWorkersArea[] = [];
  showModalChange: boolean = false;
  evaluationUser: ResponseWorkersArea | null = null;

  constructor(private cardService: CardService, private AreaService:AreaService) {}

  ngOnInit() {
    this.loadCards();

    console.log('CardListComponent initialized', this.cards);
    setInterval(() => this.loadCards(), 300000); // Actualiza cada 5 minutos (300000 ms)
  }

  loadCards() {
    this.cardService.getRecentCards().subscribe(cards => this.cards = cards);
  }

  openModalChange(User: ResponseWorkersArea) {
    this.showModalChange = true;
    this.evaluationUser = User;
  }

  closeModalChange() {
    this.showModalChange = false;
  }

  evaluationCard(User: ResponseWorkersArea) {
    this.AreaService.setEvaluationUser(User);
    this.showModalChange = false;
  }
}
