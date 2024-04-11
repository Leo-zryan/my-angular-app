import { Injectable } from '@angular/core';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import {
  NzMessageDataOptions,
  NzMessageRef,
  NzMessageService
} from 'ng-zorro-antd/message';
import { MessageKey } from '../models/types';
import { MessageModel } from '../models/message.model';
import { LiteralService } from './literal.service';
import { ModalService, ToastService } from 'ng-zorro-antd-mobile';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private deviceService: DeviceDetectorService,
    private message: NzMessageService,
    private modal: NzModalService,
    private modalM: ModalService,
    private toast: ToastService,
    private literalService: LiteralService
  ) {}
  //#region fields
  private delay = 2000;
  //#endregion
  //#region properties
  get isMobile() {
    return this.deviceService.isMobile() || this.deviceService.isTablet();
  }
  get isDesktop() {
    return this.deviceService.isDesktop();
  }
  //#endregion
  //#region methods
  showMessageKey(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading',
    messageKey: MessageKey,
    options?: NzMessageDataOptions
  ): NzMessageRef {
    const message = this.literalService.translate(messageKey);
    return this.showMessage(type, message, options);
  }
  showMessage(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading',
    message: string,
    options?: NzMessageDataOptions
  ): NzMessageRef {
    const defaultOptions: NzMessageDataOptions = {
      nzDuration: 2 * 1000
    };
    Object.assign(defaultOptions, options);
    return this.message.create(type, message, defaultOptions);
  }
  showMobileAlert(message: string, title: string) {
    return this.modalM.alert(this.literalService.translate(title), message, [
      {
        text: this.literalService.translate('OK')
      }
    ]);
  }
  showModalInformation(message: string, title = 'Information') {
    if (this.isMobile) {
      return this.showMobileAlert(
        message,
        this.literalService.translate(title)
      );
    } else {
      const options: ModalOptions = {
        nzTitle: this.literalService.translate(title),
        nzContent: message,
        nzCentered: true
      };
      return this.modal.info(options);
    }
  }
  showModalInformationKey(messageKey: MessageKey, title = 'Information') {
    return this.showModalInformation(
      this.literalService.translate(messageKey),
      title
    );
  }
  showModalWarning(message: string, title = 'Warning') {
    if (this.isMobile) {
      return this.showMobileAlert(
        message,
        this.literalService.translate(title)
      );
    } else {
      const options: ModalOptions = {
        nzTitle: this.literalService.translate(title),
        nzContent: message,
        nzCentered: true
      };
      return this.modal.warning(options);
    }
  }
  showModalWarningKey(messageKey: MessageKey, title = 'Warning') {
    return this.showModalWarning(
      this.literalService.translate(messageKey),
      title
    );
  }
  showModalConfirmation(options: ModalOptions) {
    const defaultOptions: ModalOptions = {
      nzTitle: this.literalService.translate('Confirmation'),
      nzCentered: true
    };
    Object.assign(defaultOptions, options);
    return this.modal.confirm(defaultOptions);
  }
  showModalSuccess(message: string, title = 'Success') {
    if (this.isMobile) {
      return this.showMobileAlert(
        message,
        this.literalService.translate(title)
      );
    } else {
      const options: ModalOptions = {
        nzTitle: this.literalService.translate(title),
        nzContent: message,
        nzCentered: true
      };
      const instance = this.modal.success(options);
      setTimeout(() => {
        instance.close();
      }, this.delay);
      return instance;
    }
  }
  showModalSuccessKey(
    messageKey: MessageKey = 'Information_OperationSuccessful',
    title = 'Success'
  ) {
    return this.showModalSuccess(
      this.literalService.translate(messageKey),
      title
    );
  }
  showModalError(message: string, title: string = 'Error') {
    if (this.isMobile) {
      return this.showMobileAlert(
        message,
        this.literalService.translate(title)
      );
    } else {
      const options: ModalOptions = {
        nzTitle: this.literalService.translate(title),
        nzContent: message,
        nzCentered: true
      };
      return this.modal.error(options);
    }
  }
  showModalErrorKey(messageKey: MessageKey, title: string = 'Error') {
    return this.showModalError(
      this.literalService.translate(messageKey),
      title
    );
  }
  showModalErrorModel(message: MessageModel) {
    if (typeof message.code === 'undefined') {
      console.log(message);
      return this.showModalErrorKey('Error_UnKnown');
    } else {
      return this.showModalErrorKey(message.code as MessageKey);
    }
  }
  //#endregion
}
