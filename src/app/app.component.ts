import { Component } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import HighchartsBoost from 'highcharts/modules/boost';
import exporting from 'highcharts/modules/exporting';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { dataset1, dataset2 } from './data';
exporting(Highcharts);
NoDataToDisplay(Highcharts);
HighchartsBoost(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  highcharts = Highcharts;

  option1: Highcharts.Options = {
    chart: {
      zooming: {
        type: 'x',
      }
    },
    title: {
      text: undefined,
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1,
        dashStyle: 'Solid',
        marker: {
          enabled: false,
          enabledThreshold: 3,
          symbol: 'circle',
          height: 4,
          width: 4,
        },
        states: {
          inactive: {
            opacity: 1,
          },
        },
        boostThreshold: 1000,
        turboThreshold: 0,
        dataLabels: {},
      },
    },
    xAxis: {
      crosshair: {
        color: '#A5A5A5',
      },
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M </br> %e. %b',
        hour: '%H:%M </br> %e. %b',
        day: '%a </br> %e. %b',
        week: '%a </br> %e. %b',
        month: "%b '%y",
        year: '%Y',
      },
      type: 'datetime',
      scrollbar: {
        enabled: true,
        showFull: false,
      },
      ordinal: false,
      events: {
        afterSetExtremes: this.updateExtremes,
      }
    },
    yAxis: {
      tickLength: 10,
      tickWidth: 1,
      lineWidth: 1,

    },
    time: {
      useUTC: false,
    },
    boost: {
      useGPUTranslations: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'line',
        name: 'Dataset 1',
        data: dataset1,
        color: "red",
      }
    ]
  };

  option2: Highcharts.Options = {
    chart: {
      zooming: {
        type: 'x',
      }
    },
    title: {
      text: undefined,
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1,
        dashStyle: 'Solid',
        marker: {
          enabled: false,
          enabledThreshold: 3,
          symbol: 'circle',
          height: 4,
          width: 4,
        },
        states: {
          inactive: {
            opacity: 1,
          },
        },
        boostThreshold: 1000,
        turboThreshold: 0,
        dataLabels: {},
      },
    },
    xAxis: {
      crosshair: {
        color: '#00B18F',
      },
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M </br> %e. %b',
        hour: '%H:%M </br> %e. %b',
        day: '%a </br> %e. %b',
        week: '%a </br> %e. %b',
        month: "%b '%y",
        year: '%Y',
      },
      type: 'datetime',
      scrollbar: {
        enabled: true,
        showFull: false,
      },
      ordinal: false,
      events: {
        afterSetExtremes: this.updateExtremes,
      }
    },
    yAxis: {
      tickLength: 10,
      tickWidth: 1,
      lineWidth: 1,

    },
    time: {
      useUTC: false,
    },
    boost: {
      useGPUTranslations: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'line',
        name: 'Dataset 2',
        data: dataset2,
        color: "green",
      }
    ]
  };

  // highlighted points
  points: Highcharts.Point[] = [];

  synchronize(mouseEvent: MouseEvent) {
    Highcharts.charts.forEach((chart) => {
      if (chart) {
        const event = chart.pointer.normalize(mouseEvent);
        const point = chart.series[0].searchPoint(event, true);

        if (point) {
          this.points.push(point);
          point.setState('hover');
          chart.xAxis[0].drawCrosshair(event, point);
          chart!.tooltip.refresh([point]);
        }
      }
    });
  }

  removeSynchronize() {
    this.points.forEach(point => point.setState(''));
    Highcharts.charts.forEach((chart) => {
      chart?.tooltip.hide();
      chart?.xAxis[0].hideCrosshair();
    });
  }

  updateExtremes (x: { min: number, max: number }) {
    Highcharts.charts.forEach((chart) => chart?.xAxis[0].setExtremes(x.min, x.max));
  }
}
