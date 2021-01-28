import { ComponentFactory, ComponentFactoryResolver, Directive, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';


export interface FactoryComponent {
  data: any;
  field?: string;
  valueChange: EventEmitter<void>;
}

@Directive({
  selector: '[appComponentContainer]'
})
export class ComponentContainerDirective implements OnInit {

  @Input() item: any = {} ;
  @Input() data: any = {} ; 
  @Output() valueChange = new EventEmitter<void>();
  constructor(public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }
    
  ngOnInit(): void {
    const componentFactory: ComponentFactory<FactoryComponent>
     = this.componentFactoryResolver.resolveComponentFactory(this.item.component);

    const viewContainerRef = this.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<FactoryComponent>(componentFactory);
    componentRef.instance.data = this.data;
    componentRef.instance.field = this.item.field;
    componentRef.instance.valueChange = this.valueChange;
  }
}
