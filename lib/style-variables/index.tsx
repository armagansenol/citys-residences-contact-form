type StyleVariablesProps = {
  colors?: Record<string, string>
  themes?: Record<string, Record<string, string>>
}

export function StyleVariables({ colors = {}, themes = {} }: StyleVariablesProps) {
  const cssText = `
    :root {
      ${Object.entries(colors)
        .map(([key, value]) => `--${key}: ${value};`)
        .join("\n      ")}
    }
    ${Object.entries(themes)
      .map(
        ([key, colors]) => `
    [data-theme='${key}'], .theme-${key} {
      ${Object.entries(colors)
        .map(([key, value]) => `--theme-${key}: ${value};`)
        .join("\n      ")}
    }`
      )
      .join("\n")}
  `.trim()

  return (
    <style
      // biome-ignore lint/security/noDangerouslySetInnerHtml: CSS variables injection
      dangerouslySetInnerHTML={{ __html: cssText }}
    />
  )
}
