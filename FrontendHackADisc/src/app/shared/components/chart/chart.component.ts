import { Component, Inject, NgZone, PLATFORM_ID, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Evaluation, ResponseWorkersArea } from 'src/app/area-manager/interfaces/ResponseWorkersArea';
import { AreaService } from '../../../area-manager/services/area.service';
import { Subscription } from 'rxjs';

interface EvaluationCompare {
  category: string;
  firstValue: number;
  lastValue: number;
}

@Component({
  selector: 'shared-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnInit {
  private root!: am5.Root;
  private subscription: Subscription = new Subscription();

  Evaluations: Evaluation[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone, private areaService: AreaService) {}

  ngOnInit(): void {
    this.Subscription()
    console.log('EvaluationComponent initialized', this.Evaluations);

  }

  async Subscription() {
    this.subscription = await this.areaService.userToEvaluate$.subscribe(user => {
      this.Evaluations = user?.evaluations || [];
      this.updateChart();
    });
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.initializeChart();
    });
  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  initializeChart() {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

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

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Primera evaluación",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "firstValue",
        categoryXField: "category"
      })
    );

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Última evaluación",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "lastValue",
        categoryXField: "category"
      })
    );

    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;
  }

  updateChart() {
    if (this.root && this.Evaluations.length > 0) {
      let firstEvaluation = this.Evaluations[0];
      let lastEvaluation = this.Evaluations[this.Evaluations.length - 1];

      let data: EvaluationCompare[] = [
        {
          category: 'Adaptabilidad al cambio',
          firstValue: firstEvaluation.adaptability_to_change,
          lastValue: lastEvaluation.adaptability_to_change
        },
        {
          category: 'Conducta segura',
          firstValue: firstEvaluation.safe_conduct,
          lastValue: lastEvaluation.safe_conduct
        },
        {
          category: 'Energía dinámica',
          firstValue: firstEvaluation.dynamsim_energy,
          lastValue: lastEvaluation.dynamsim_energy
        },
        {
          category: 'Eficacia Personal',
          firstValue: firstEvaluation.personal_effectiveness,
          lastValue: lastEvaluation.personal_effectiveness
        },
        {
          category: 'Iniciativa',
          firstValue: firstEvaluation.initiative,
          lastValue: lastEvaluation.initiative
        },
        {
          category: 'Trabajo bajo presión',
          firstValue: firstEvaluation.working_under_pressure,
          lastValue: lastEvaluation.working_under_pressure
        }
      ];

      let chart = this.root.container.children.getIndex(0) as am5xy.XYChart;
      let xAxis = chart.xAxes.getIndex(0) as am5xy.CategoryAxis<am5xy.AxisRendererX>;
      let series1 = chart.series.getIndex(0) as am5xy.ColumnSeries;
      let series2 = chart.series.getIndex(1) as am5xy.ColumnSeries;

      xAxis.data.setAll(data);
      series1.data.setAll(data);
      series2.data.setAll(data);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }
}
