import { LiteralService } from 'src/app/core/services/literal.service';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private literalService: LiteralService) {}
  transform(key: string): string {
    return this.literalService.translate(key);
  }
}
