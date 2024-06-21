import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ResponseWorkersArea, Evaluation } from '../../interfaces/ResponseWorkersArea';
import { AreaService } from '../../services/area.service';
import { Router } from '@angular/router';

@Component({
  selector: 'area-evaluations-card',
  templateUrl: './evaluations-card.component.html',
  styleUrls: ['./evaluations-card.component.css']
})
export class EvaluationsCardComponent implements OnInit, AfterViewInit {

  User: ResponseWorkersArea | null = null;

  // Define the parameters and corresponding properties in the Evaluation interface
  evaluationParameters: { displayName: string, property: keyof Evaluation }[] = [
    { displayName: 'Adaptabilidad al cambio', property: 'adaptability_to_change' },
    { displayName: 'Conducta segura', property: 'safe_conduct' },
    { displayName: 'Energía dinámica', property: 'dynamsim_energy' },
    { displayName: 'Eficacia Personal', property: 'personal_effectiveness' },
    { displayName: 'Iniciativa', property: 'initiative' },
    { displayName: 'Trabajo bajo presión', property: 'working_under_pressure' }
  ];

  condition: string = 'General';

  constructor(private AreaService: AreaService, private router:Router) {}

  ngOnInit(): void {
    this.User = this.AreaService.getEvaluationUser();
    if (!this.User) return;
  }

  ngAfterViewInit(): void {
    this.User = this.AreaService.getEvaluationUser();
  }

  setCondition(condition: string): void {
    this.condition = condition;
    this.scrollToCondition();
  }

  scrollToCondition(): void {
    const element = document.getElementById(this.condition);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goTable(): void {
    this.router.navigateByUrl('/area/dashboard');
  }
}
