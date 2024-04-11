import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from './base.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
@Component({
  template: ''
})
export abstract class BaseFormComponent<TFormModel>
  extends BaseComponent
  implements OnInit, OnDestroy
{
  constructor(
    protected store: Store,
    protected route: ActivatedRoute
  ) {
    super();
  }
  //#region fields
  protected data: TFormModel;
  public form: FormGroup;
  public isNew: boolean;
  protected id: number = 0;
  protected isLoading = false;
  //#endregion
  //#region properties
  get hasPermissionEdit() {
    return true;
  }
  get hasPermissionDelete() {
    return true;
  }
  get btnSubmitHidden() {
    return !this.hasPermissionEdit;
  }
  get btnSubmitDisabled() {
    return false;
  }
  get btnDeleteHidden() {
    return this.isNew || !this.hasPermissionDelete;
  }
  get btnDeleteDisabled() {
    return false;
  }
  get formIsOriginal() {
    return this.form.pristine && this.form.untouched;
  }
  //#endregion
  //#region events
  override ngOnInit() {
    super.ngOnInit();
  }
  override ngOnDestroy() {
    super.ngOnDestroy();
  }
  public onSubmit() {
    let isInvalid: boolean = false;
    if (this.form.invalid) {
      this.validateForm();
      isInvalid = this.form.invalid;
    }
    if (!this.CustomValidate()) {
      isInvalid = true;
    }
    if (isInvalid) {
      return;
    }
    if (this.isNew) {
      this.onCreate();
    } else {
      this.onUpdate();
    }
  }
  protected CustomValidate() {
    return true;
  }
  public onBackClick() {
    this.onBack();
  }
  public onDeleteClick() {
    this.onDelete();
  }
  protected abstract onInitCreate(): Promise<void>;
  protected abstract onInitUpdate(): Promise<void>;
  protected abstract onCreate(): Promise<void>;
  protected abstract onUpdate(): Promise<void>;
  protected abstract onBack(): Promise<void>;
  protected abstract onDelete(): Promise<void>;
  //#endregion
  //#region methods
  private controlsForEach(
    action: (ctrl: AbstractControl) => void,
    form?: FormGroup
  ) {
    form = form || this.form;
    for (const i in form.controls) {
      if (form.controls.hasOwnProperty(i)) {
        action(form.controls[i]);
      }
    }
  }
  protected async routeActions() {
    await this.getRouteParam();
    if (this.isNew) {
      this.onInitCreate();
    } else {
      this.onInitUpdate();
    }
  }
  protected async getRouteParam() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const page = this.route.snapshot.url[1];
      this.isNew = page.path === 'new';
      this.id = parseInt(params.get('id') || '0', 10);
    });
  }
  protected validateForm(form?: FormGroup) {
    form = form || this.form;
    form.markAsDirty();
    this.controlsForEach(ctrl => {
      this.validateControl(ctrl);
    }, form);
  }
  protected resetForm(form?: FormGroup) {
    form = form || this.form;
    form.markAsPristine();
    form.markAsUntouched();
    this.controlsForEach(ctrl => {
      this.resetControl(ctrl);
    }, form);
  }
  protected getFormValue() {
    return this.form.getRawValue() as TFormModel;
  }
  protected getFormElement<T extends AbstractControl>(
    key: string,
    form?: FormGroup
  ) {
    form = form || this.form;
    return form.controls[key] as T;
  }
  protected setFormElement<T extends AbstractControl>(
    key: string,
    value: T,
    form?: FormGroup
  ) {
    form = form || this.form;
    form.controls[key] = value;
  }
  protected validateControl(ctrl: AbstractControl) {
    ctrl.markAsDirty();
    ctrl.updateValueAndValidity();
  }
  protected resetControl(ctrl: AbstractControl) {
    ctrl.markAsPristine();
    ctrl.updateValueAndValidity();
  }
  protected changeControlStatus(ctrlNames: string[], enable: boolean) {
    const action = enable ? 'enable' : 'disable';
    ctrlNames.forEach(ctrlName => {
      this.getFormElement<FormControl>(ctrlName)[action]();
    });
  }
  protected updateFormValidates(control: string, validators: ValidatorFn[]) {
    this.form.get(control).setValidators(validators);
    this.form.get(control).updateValueAndValidity();
  }
  //#endregion
}
