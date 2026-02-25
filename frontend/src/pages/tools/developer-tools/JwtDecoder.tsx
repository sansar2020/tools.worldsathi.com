import React, { useState } from 'react';
import ToolPageTemplate from '../ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Shield, AlertCircle } from 'lucide-react';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';

export default function JwtDecoder() {
  const tool = ALL_TOOLS.find((t) => t.id === 'jwt-decoder')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  const [jwtInput, setJwtInput] = useState<string>('');
  const [header, setHeader] = useState<string>('');
  const [payload, setPayload] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copiedSection, setCopiedSection] = useState<string>('');

  const decodeJwt = () => {
    try {
      setError('');
      const parts = jwtInput.trim().split('.');

      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT must have three parts separated by dots.');
      }

      // Decode header
      const decodedHeader = JSON.parse(atob(parts[0]));
      setHeader(JSON.stringify(decodedHeader, null, 2));

      // Decode payload
      const decodedPayload = JSON.parse(atob(parts[1]));
      setPayload(JSON.stringify(decodedPayload, null, 2));

      // Signature (cannot verify without secret)
      setSignature(parts[2]);
    } catch (err: any) {
      setError(err.message || 'Failed to decode JWT');
      setHeader('');
      setPayload('');
      setSignature('');
    }
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  const faqs = [
    {
      question: 'What is a JWT?',
      answer: 'JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. It consists of three parts: header, payload, and signature.'
    },
    {
      question: 'Can this tool verify JWT signatures?',
      answer: 'No, signature verification requires the secret key and cannot be done securely in the browser. This tool only decodes the header and payload.'
    },
    {
      question: 'Is it safe to decode JWTs here?',
      answer: 'All decoding happens in your browser; no data is sent to any server. However, avoid pasting production tokens with sensitive data.'
    },
    {
      question: 'What information is in the header?',
      answer: 'The header typically contains the token type (JWT) and the signing algorithm used (e.g., HS256, RS256).'
    },
    {
      question: 'What information is in the payload?',
      answer: 'The payload contains claims about the user and additional metadata, such as expiration time (exp), issued at (iat), and custom claims.'
    },
    {
      question: 'Why can\'t I see the signature decoded?',
      answer: 'The signature is a cryptographic hash that cannot be decoded. It can only be verified using the secret key on the server.'
    },
    {
      question: 'What if my JWT is expired?',
      answer: 'This tool will still decode expired tokens. Check the "exp" claim in the payload to see the expiration timestamp.'
    }
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-jwt-decoder-hero-gradient.dim_1200x400.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="jwtInput">JWT Token</Label>
          <Textarea
            id="jwtInput"
            value={jwtInput}
            onChange={(e) => setJwtInput(e.target.value)}
            placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            className="font-mono min-h-[120px]"
          />
        </div>

        <Button variant="primary" onClick={decodeJwt} className="w-full">
          <Shield className="mr-2 h-4 w-4" />
          Decode JWT
        </Button>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {header && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Header</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(header, 'header')}
              >
                {copiedSection === 'header' ? (
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
              value={header}
              readOnly
              className="font-mono min-h-[100px] bg-muted"
            />
          </div>
        )}

        {payload && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Payload</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(payload, 'payload')}
              >
                {copiedSection === 'payload' ? (
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
              value={payload}
              readOnly
              className="font-mono min-h-[150px] bg-muted"
            />
          </div>
        )}

        {signature && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Signature</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(signature, 'signature')}
              >
                {copiedSection === 'signature' ? (
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
              value={signature}
              readOnly
              className="font-mono min-h-[80px] bg-muted"
            />
            <div className="p-3 bg-muted/50 border rounded-lg flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Signature verification is not available client-side. Use a server-side tool with the secret key to verify the signature.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolPageTemplate>
  );
}
