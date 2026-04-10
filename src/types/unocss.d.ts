import 'unocss'

declare module 'unocss' {
  interface CustomTheme {
    colors?: Record<string, string | Record<string, string>>
    spacing?: Record<string, string>
    borderRadius?: Record<string, string>
    screens?: Record<string, string>
  }
}
