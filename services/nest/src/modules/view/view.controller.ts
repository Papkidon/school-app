import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class ViewController {
  @Get()
  @Render('index')
  async root() {
    try {
      return;
    } catch (e) {
      console.log(e);
    }
  }
}
