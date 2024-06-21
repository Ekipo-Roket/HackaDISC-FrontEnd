import { Injectable } from '@angular/core';
import { AreaService } from './area.service';
import { ResponseWorkersArea } from '../interfaces/ResponseWorkersArea';
import { Stat } from 'src/app/shared/interfaces/ResponseStat';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  Workers: ResponseWorkersArea[] = [];
  Stats: Stat[] = [];

  constructor(private areaService: AreaService, private http: HttpClient) {
    this.updateWorkers();
    this.getStats();
    setInterval(() => this.updateWorkers(), 300000);
  }

  updateWorkers() {
    this.areaService.getWorkersArea().then((workers) => {
      this.Workers = workers;
      this.updateWorkerStats();
    });
  }

  async getStats() {
    let newStat: any = []
    await this.areaService.getStats().then((stats) => {
      newStat = stats;
      this.Stats = newStat[0];
      this.updateWorkerStats();
    });
  }

  updateWorkerStats() {
    this.Workers.forEach(worker => {
      const stat = this.Stats.find(stat => stat.id === worker.stat_id);
      worker.stat_name = stat ? stat.name_stat : 'Unknown';
    });
  }

  getRecentCards(): Observable<ResponseWorkersArea[]> {
    return of(this.Workers).pipe(
      map(cards => cards
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 6)
      )
    );
  }
}
