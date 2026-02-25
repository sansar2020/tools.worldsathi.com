const relatedTools = [
  getToolById('tool-id-1'),
  getToolById('tool-id-2'),
  getToolById('tool-id-3'),
].filter((t): t is NonNullable<typeof t> => t !== undefined);

return (
  <ToolPageTemplate
    tool={tool}
    gradientFilename="..."
    faqs={tool.faqs || []}
    relatedTools={relatedTools}
  >
