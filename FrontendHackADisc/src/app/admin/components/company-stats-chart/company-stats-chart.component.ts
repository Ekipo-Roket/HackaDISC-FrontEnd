import { Component, Inject, Input, NgZone, PLATFORM_ID, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { MulticompaniesService } from '../../services/multicompanies.service';
import { ResponseCompanyStats } from '../../interfaces/ResponseCompanyStats';
import { ActivatedRoute} from '@angular/router';
import { initFlowbite, initTabs } from 'flowbite';
import { ResponseCompany } from '../../interfaces/ResponseCompany';

@Component({
  selector: 'company-stats-chart',
  templateUrl: './company-stats-chart.component.html',
  styleUrls: ['./company-stats-chart.component.css']
})

export class CompanyStatsChartComponent implements OnDestroy, OnInit, AfterViewInit{
  private root!: am5.Root;
  company_id: number = 0;
  Evaluations!: ResponseCompanyStats;

  randomWorkersTotal: number = 0;
  randomInterventionsTotal: number = 0;
  randomChangesTotal: number = 0;
  randomMonthsTotal: number = 0;

  @Input() company!: ResponseCompany;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private activated: ActivatedRoute, private zone: NgZone, private CompanyService: MulticompaniesService) {}

  ngAfterViewInit() {
    this.initializeFlowbite();
  }

  initializeFlowbite() {
    initFlowbite();
    initTabs();
  }

  ngOnInit(): void {
    this.company_id = this.activated.snapshot.params['id'];
    this.getStats();
    this.randomWorkersTotal = this.generateRandomNumber();
    this.randomInterventionsTotal = this.generateRandomNumber();
    this.randomChangesTotal = this.generateRandomNumber();
    this.randomMonthsTotal = this.generateRandomNumber();

  }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  async getStats() {
    await this.CompanyService.getCompanyStats(this.company_id)?.then((data) => {
      this.Evaluations = data;

    });
    console.log(this.Evaluations);
    this.createChart();
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  createChart() {
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        })
      );

      if (this.Evaluations) {

        let data = [
          {
            category: 'Adaptabilidad al cambio',
            firstValue: this.Evaluations.adaptability_to_change_before,
            lastValue: this.Evaluations.adaptability_to_change_after
          },
          {
            category: 'Conducta segura',
            firstValue: this.Evaluations.safe_conduct_before,
            lastValue: this.Evaluations.safe_conduct_after
          },
          {
            category: 'Energía dinámica',
            firstValue: this.Evaluations.dynamsim_energy_before,
            lastValue: this.Evaluations.dynamsim_energy_after
          },
          {
            category: 'Eficacia Personal',
            firstValue: this.Evaluations.personal_effectiveness_before,
            lastValue: this.Evaluations.personal_effectiveness_after
          },
          {
            category: 'Iniciativa',
            firstValue: this.Evaluations.initiative_before,
            lastValue: this.Evaluations.initiative_after
          },
          {
            category: 'Trabajo bajo presión',
            firstValue: this.Evaluations.working_under_pressure_before,
            lastValue: this.Evaluations.working_under_pressure_after
          }
        ];

        let yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
          })
        );

        let xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            categoryField: "category"
          })
        );
        xAxis.data.setAll(data);

        let series1 = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Primera evaluación",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "firstValue",
            categoryXField: "category"
          })
        );
        series1.data.setAll(data);

        let series2 = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: "Última evaluación",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "lastValue",
            categoryXField: "category"
          })
        );
        series2.data.setAll(data);

        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        chart.set("cursor", am5xy.XYCursor.new(root, {}));
      }

      this.root = root;
    });
  }
  compareStats(recent: number, old: number): number {
    if (recent === old) {

      return 0;
    }
    else if (recent < old) {
      return 1;
    }
    else {
      return -1
    }
  }

  ngOnDestroy() {
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}


