namespace BootstrapTS {
  /** This is the bootstrap function that you can modify the contents of to run your javascript solution.
   * At the moment it just calls a naively written function that incorrectly 
   * @param el - the tapedeck element
   */
  export function bootstrap(el:Element) {
      TapedeckTS.bindButtons(el);
  }
}