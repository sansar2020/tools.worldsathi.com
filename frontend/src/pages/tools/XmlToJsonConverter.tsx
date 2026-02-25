import React, { useState } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Code2 } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function XmlToJsonConverter() {
  const tool = ALL_TOOLS.find((t) => t.id === 'xml-to-json-converter')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [xmlInput, setXmlInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const xmlToJson = (xml: Node): any => {
    let obj: any = {};

    if (xml.nodeType === 1) { // Element node
      const element = xml as Element;
      if (element.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let j = 0; j < element.attributes.length; j++) {
          const attribute = element.attributes.item(j);
          if (attribute) {
            obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
          }
        }
      }
    } else if (xml.nodeType === 3) { // Text node
      return xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        if (!item) continue;
        
        const nodeName = item.nodeName;

        if (typeof obj[nodeName] === 'undefined') {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };

  const handleConvert = () => {
    try {
      setError('');
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, 'text/xml');

      const parseError = xmlDoc.getElementsByTagName('parsererror');
      if (parseError.length > 0) {
        throw new Error('Invalid XML format');
      }

      const result = xmlToJson(xmlDoc);
      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setError(err.message || 'Failed to convert XML to JSON');
      setJsonOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      question: 'What XML features are supported?',
      answer: 'This converter supports elements, attributes, text content, and nested structures. CDATA and namespaces are partially supported.'
    },
    {
      question: 'How are XML attributes handled?',
      answer: 'Attributes are converted to an @attributes object within the element.'
    },
    {
      question: 'Can I convert large XML files?',
      answer: 'Yes, but very large files may take longer to process in the browser.'
    },
    {
      question: 'Is the conversion reversible?',
      answer: 'Use our JSON to XML converter to reverse the process, though some formatting may differ.'
    },
    {
      question: 'What if my XML has errors?',
      answer: 'The tool will display an error message. Ensure your XML is well-formed before converting.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-xml-to-json-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="xmlInput">XML Input</Label>
          <Textarea
            id="xmlInput"
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            placeholder="Paste your XML here..."
            className="font-mono min-h-[200px]"
          />
        </div>

        <Button variant="primary" onClick={handleConvert} className="w-full">
          <Code2 className="mr-2 h-4 w-4" />
          Convert to JSON
        </Button>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {jsonOutput && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>JSON Output</Label>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={jsonOutput}
              readOnly
              className="font-mono min-h-[200px] bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
