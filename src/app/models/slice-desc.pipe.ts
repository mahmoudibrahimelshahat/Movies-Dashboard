import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceDesc'
})
export class SliceDescPipe implements PipeTransform {


  transform(overview: string,count: number): string {
    return overview.slice(0,count).trimEnd() +"..." }

}
