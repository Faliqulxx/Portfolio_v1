// View Transition API type declarations
// Diperlukan karena belum masuk ke TypeScript lib standar
interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition(callback?: () => void | Promise<void>): ViewTransition;
}
