import { Bloc } from 'src/app/shared/domain/Bloc';
import { CoreAppState, initialAppState } from '../../domain/CoreAppState';

export class CoreAppBloc extends Bloc<CoreAppState> {
  public constructor(_initialAppState: CoreAppState = initialAppState) {
    super(_initialAppState);
  }

  public updateTitle(title: string): void {
    this.changeState({ ...this.state, title });
  }

  public openLoader(): void {
    this.changeState({ ...this.state, loader: true });
  }

  public closeLoader(): void {
    this.changeState({ ...this.state, loader: false });
  }

  public openSnackbar(message: string, severity: string = 'info'): void {
    this.changeState({
      ...this.state,
      snackbar: {
        open: true,
        message,
        severity,
      },
    });
  }

  public closeSnackbar(): void {
    this.changeState({
      ...this.state,
      snackbar: {
        open: false,
      },
    });
  }

  public openDrawer(): void {
    this.changeState({ ...this.state, drawer: true });
  }

  public closeDrawer(): void {
    this.changeState({ ...this.state, drawer: false });
  }

  public toggleDrawer(state?: boolean): void {
    this.changeState({
      ...this.state,
      drawer: state ?? !this.state.drawer,
    });
  }

  public openOverflowMenu(event: Element): void {
    this.changeState({ ...this.state, overflowMenu: event });
  }

  public closeOverflowMenu(): void {
    this.changeState({ ...this.state, overflowMenu: null });
  }

  public toggleOverflowMenu(event: Element): void {
    this.changeState({
      ...this.state,
      overflowMenu: event === this.state.overflowMenu ? null : event,
    });
  }
}
