import { Component, Input, Inject, PLATFORM_ID, OnInit, OnChanges, forwardRef } from '@angular/core';
import { connectPagination } from 'instantsearch.js/es/connectors';
import { noop } from 'lodash-es';
// import { NgAisHitsPerPage } from 'angular-instantsearch/hits-per-page/hits-per-page';
import { BaseWidget, NgAisModule, NgAisInstantSearch } from 'angular-instantsearch';
// import { TftInstantSearchInstance } from '../instantsearch/instantsearch-instance';
// import { parseNumberInput } from '../utils';
// import { TftResultsPerPageComponent } from '../results-per-page/results-per-page.component';

@Component({
  selector: 'tft-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: ['pagination.component.scss']
})
export class PaginationComponent extends BaseWidget implements OnInit {
  // render options
  @Input() public showFirst = true;
  @Input() public showLast = false;
  @Input() public showPrevious = true;
  @Input() public showNext = true;
  @Input() public pagesPadding: number | string = 3;

  // connector optionsw
  @Input() public maxPages?: number | string;
  @Input() public pageSizes: number[] = [10, 25, 50, 100];
  // @ViewChild(NgAisHitsPerPage) perPage: NgAisHitsPerPage;

  pageSizeOptions = this.pageSizes.map( (val, index) => {
    // sets default page size to first number in array
    const isStart = index === 0;
    return  { value: val, label: val.toFixed(0), default: isStart};
  });

  public state = {
    createURL: noop,
    currentRefinement: 0,
    pageSize: 10,
    nbHits: 0,
    nbPages: 0,
    refine: noop
  };
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch)) public instantSearchParent,

  ) {
    super('Pagination');
  }

  ngOnInit() {
    super.createWidget(connectPagination, {
      maxPages: this.parseNumberInput(this.maxPages)
    });
    super.ngOnInit();
  }

  // TODO: request mouse event from MatPaginator
  public refine(/*event: MouseEvent,*/ pageOptions: any, hitsPerPage: any) {
    // event.stopPropagation();
    // event.preventDefault();
    const page = pageOptions.pageIndex;
    if (page <= this.state.nbPages && page >= 0) {
      // this.perPage.state.refine(pageOptions.pageSize);
      hitsPerPage.state.refine(pageOptions.pageSize);
      this.state.refine(page);
    }
  }
  parseNumberInput(input?: number | string) {
    return typeof input === 'string' ? parseInt(input, 10) : input;
  }
};
