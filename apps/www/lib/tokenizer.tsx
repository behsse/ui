import React from 'react'
import styles from '@/app/components/syntax-highlighting.module.scss'

// TypeScript/TSX keywords
const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'break', 'continue', 'default', 'try', 'catch', 'finally',
  'throw', 'new', 'typeof', 'instanceof', 'delete', 'void', 'async', 'await',
  'class', 'extends', 'super', 'this', 'static', 'public', 'private', 'protected',
  'readonly', 'abstract', 'interface', 'enum', 'namespace', 'module',
  'declare', 'export', 'import', 'from', 'as', 'default', 'implements',
  'in', 'of', 'yield', 'null', 'undefined', 'true', 'false', 'type'
])

// TypeScript type modifier keyword
const TYPE_KEYWORD = 'type'

// TypeScript types
const TYPES = new Set([
  'string', 'number', 'boolean', 'any', 'unknown', 'never', 'void',
  'Array', 'Promise', 'Record', 'Partial', 'Required', 'Readonly',
  'Pick', 'Omit', 'Exclude', 'Extract', 'NonNullable', 'Parameters',
  'ReturnType', 'InstanceType', 'ThisType'
])

interface Token {
  type: string
  value: string
}

// CLI package managers
const CLI_COMMANDS = new Set(['pnpm', 'npm', 'npx', 'yarn', 'bun', 'bunx'])

/**
 * Check if code is a CLI command (starts with pnpm, npm, npx, yarn, bun, or bunx)
 */
function isCLICommand(code: string): boolean {
  // Get the first word (trim whitespace, get first word before space)
  const firstWord = code.trim().split(/\s+/)[0]
  return CLI_COMMANDS.has(firstWord)
}

/**
 * Simple tokenizer for TypeScript/TSX code
 */
export function tokenizeCode(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  let inJSXTag = false // Track if we're inside a JSX tag
  let inJSXContent = false // Track if we're between opening and closing tags
  let inImportBraces = false // Track if we're inside import { ... }

  // If it's a CLI command, return everything as plain text
  if (isCLICommand(code)) {
    return [{ type: 'cli-command', value: code }]
  }

  while (i < code.length) {
    const char = code[i]

    // Skip whitespace and newlines (preserve them)
    if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
      tokens.push({ type: 'whitespace', value: char })
      i++
      continue
    }

    // Single-line comment
    if (code.slice(i, i + 2) === '//') {
      let comment = '//'
      i += 2
      while (i < code.length && code[i] !== '\n') {
        comment += code[i]
        i++
      }
      tokens.push({ type: 'comment', value: comment })
      continue
    }

    // Multi-line comment
    if (code.slice(i, i + 2) === '/*') {
      let comment = '/*'
      i += 2
      while (i < code.length - 1 && code.slice(i, i + 2) !== '*/') {
        comment += code[i]
        i++
      }
      comment += '*/'
      i += 2
      tokens.push({ type: 'comment', value: comment })
      continue
    }

    // String literals (single quotes)
    if (char === "'") {
      let str = "'"
      i++
      while (i < code.length && code[i] !== "'") {
        if (code[i] === '\\') {
          str += code[i] + (code[i + 1] || '')
          i += 2
        } else {
          str += code[i]
          i++
        }
      }
      str += "'"
      i++
      tokens.push({ type: 'string', value: str })
      continue
    }

    // String literals (double quotes)
    if (char === '"') {
      let str = '"'
      i++
      while (i < code.length && code[i] !== '"') {
        if (code[i] === '\\') {
          str += code[i] + (code[i + 1] || '')
          i += 2
        } else {
          str += code[i]
          i++
        }
      }
      str += '"'
      i++
      tokens.push({ type: 'string', value: str })
      continue
    }

    // Template literals
    if (char === '`') {
      let str = '`'
      i++
      while (i < code.length && code[i] !== '`') {
        if (code[i] === '\\') {
          str += code[i] + (code[i + 1] || '')
          i += 2
        } else {
          str += code[i]
          i++
        }
      }
      str += '`'
      i++
      tokens.push({ type: 'string', value: str })
      continue
    }

    // Numbers
    if (/\d/.test(char)) {
      let num = char
      i++
      while (i < code.length && /[\d._]/.test(code[i])) {
        num += code[i]
        i++
      }
      tokens.push({ type: 'number', value: num })
      continue
    }

    // JSX opening tags <ComponentName or <htmlTag
    if (char === '<' && /[A-Za-z]/.test(code[i + 1]) && code[i + 1] !== '/') {
      inJSXTag = true
      inJSXContent = false // We're entering a tag, not in content anymore
      tokens.push({ type: 'punctuation', value: '<' })
      i++

      // Component or HTML tag name
      let tagName = ''
      while (i < code.length && /[A-Za-z0-9]/.test(code[i])) {
        tagName += code[i]
        i++
      }

      // Check if it's a React component (PascalCase) or HTML tag (lowercase)
      if (/^[A-Z]/.test(tagName)) {
        tokens.push({ type: 'jsx-tag', value: tagName }) // React component
      } else {
        tokens.push({ type: 'html-tag', value: tagName }) // HTML tag
      }
      continue
    }

    // JSX closing tags </ComponentName> or </htmlTag>
    if (code.slice(i, i + 2) === '</') {
      inJSXContent = false
      tokens.push({ type: 'punctuation', value: '<' })
      tokens.push({ type: 'punctuation', value: '/' })
      i += 2

      // Component or HTML tag name
      let tagName = ''
      while (i < code.length && /[A-Za-z0-9]/.test(code[i])) {
        tagName += code[i]
        i++
      }
      if (tagName) {
        // Check if it's a React component (PascalCase) or HTML tag (lowercase)
        if (/^[A-Z]/.test(tagName)) {
          tokens.push({ type: 'jsx-tag', value: tagName }) // React component
        } else {
          tokens.push({ type: 'html-tag', value: tagName }) // HTML tag
        }
      }
      continue
    }

    // Self-closing tags />
    if (code.slice(i, i + 2) === '/>') {
      inJSXTag = false
      tokens.push({ type: 'punctuation', value: '/' })
      tokens.push({ type: 'punctuation', value: '>' })
      i += 2
      continue
    }

    // JSX closing bracket >
    if (char === '>') {
      inJSXTag = false
      // Check if this is an opening tag (not a closing tag)
      if (tokens.length > 0 && tokens[tokens.length - 1]?.value !== '/') {
        // Look back to see if this was an opening tag
        let isOpeningTag = false
        for (let j = tokens.length - 1; j >= 0; j--) {
          if (tokens[j].value === '/') break
          if (tokens[j].value === '<') {
            isOpeningTag = true
            break
          }
        }
        if (isOpeningTag) {
          inJSXContent = true
        }
      }
      tokens.push({ type: 'punctuation', value: '>' })
      i++
      continue
    }

    // Operators (but = is punctuation in JSX tags)
    if (/[+\-*/%=<>!&|^~?:]/.test(char)) {
      // In JSX tags, = is punctuation, not an operator
      if (char === '=' && inJSXTag) {
        tokens.push({ type: 'punctuation', value: '=' })
        i++
        continue
      }

      let op = char
      i++
      // Multi-character operators
      if (i < code.length && /[=<>&|]/.test(code[i])) {
        op += code[i]
        i++
      }
      tokens.push({ type: 'operator', value: op })
      continue
    }

    // Punctuation
    if (/[()[\]{},;.]/.test(char)) {
      // Reset JSX content mode when we hit a semicolon (end of statement)
      if (char === ';') {
        inJSXContent = false
      }

      // Check if we're in an import statement by looking back
      if (char === '{') {
        // Look back to see if we have an import keyword before this {
        let hasImport = false
        for (let j = tokens.length - 1; j >= 0; j--) {
          if (tokens[j].type === 'whitespace') continue
          if (tokens[j].value === 'import') {
            hasImport = true
            break
          }
          if (tokens[j].type === 'string' || tokens[j].value === ';') break
        }
        if (hasImport) {
          inImportBraces = true
          tokens.push({ type: 'brace', value: char })
          i++
          continue
        }
      } else if (char === '}' && inImportBraces) {
        inImportBraces = false
        tokens.push({ type: 'brace', value: char })
        i++
        continue
      }

      tokens.push({ type: 'punctuation', value: char })
      i++
      continue
    }

    // Identifiers (keywords, types, variables, functions)
    if (/[a-zA-Z_$]/.test(char)) {
      let word = char
      i++
      while (i < code.length && /[a-zA-Z0-9_$-]/.test(code[i])) {
        word += code[i]
        i++
      }

      // If we're inside JSX content (between tags), treat as plain text
      if (inJSXContent) {
        tokens.push({ type: 'jsx-text', value: word })
        continue
      }

      // If we're inside a JSX tag, check if it's an attribute (followed by = eventually)
      if (inJSXTag) {
        // Look ahead to see if there's an = after potential whitespace
        let j = i
        while (j < code.length && /\s/.test(code[j])) {
          j++
        }
        // If we find = after the word (with or without spaces), it's an attribute
        if (j < code.length && code[j] === '=') {
          tokens.push({ type: 'jsx-attribute', value: word })
          continue
        }
      }

      // Special handling for words inside import braces
      if (inImportBraces) {
        if (word === 'type') {
          tokens.push({ type: 'type-keyword', value: word })
        } else {
          tokens.push({ type: 'import-name', value: word })
        }
        continue
      }

      // Check if followed by ( first (highest priority for function detection)
      if (i < code.length && code[i] === '(') {
        // Followed by ( = always a function (call or declaration)
        tokens.push({ type: 'function', value: word })
        continue
      }

      // Classify the word
      if (KEYWORDS.has(word)) {
        if (word === 'import' || word === 'export' || word === 'from') {
          tokens.push({ type: 'import-export', value: word })
        } else if (word === 'type') {
          // Check if it's "import type" or standalone type keyword
          let isImportType = false
          for (let j = tokens.length - 1; j >= 0; j--) {
            if (tokens[j].type === 'whitespace') continue
            if (tokens[j].value === 'import' || tokens[j].value === 'export') {
              isImportType = true
              break
            }
            break
          }
          if (isImportType) {
            tokens.push({ type: 'type-keyword', value: word })
          } else {
            tokens.push({ type: 'keyword', value: word })
          }
        } else {
          tokens.push({ type: 'keyword', value: word })
        }
      } else if (TYPES.has(word)) {
        tokens.push({ type: 'type', value: word })
      } else if (/^[A-Z]/.test(word)) {
        // PascalCase = class/component name
        tokens.push({ type: 'class-name', value: word })
      } else {
        // Check if this is an arrow function declaration (const name = () =>)
        // Look ahead for = and then for arrow function pattern
        let j = i
        while (j < code.length && /\s/.test(code[j])) j++

        if (j < code.length && code[j] === '=') {
          // Skip the =
          j++
          while (j < code.length && /\s/.test(code[j])) j++

          // Check for arrow function patterns: () => or (params) => or param =>
          let isArrowFunc = false
          if (j < code.length) {
            if (code[j] === '(') {
              // Find matching closing paren
              let depth = 1
              j++
              while (j < code.length && depth > 0) {
                if (code[j] === '(') depth++
                if (code[j] === ')') depth--
                j++
              }
              // Check for =>
              while (j < code.length && /\s/.test(code[j])) j++
              if (j + 1 < code.length && code.slice(j, j + 2) === '=>') {
                isArrowFunc = true
              }
            } else if (/[a-zA-Z_$]/.test(code[j])) {
              // Single param arrow function: param =>
              while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++
              while (j < code.length && /\s/.test(code[j])) j++
              if (j + 1 < code.length && code.slice(j, j + 2) === '=>') {
                isArrowFunc = true
              }
            }
          }

          if (isArrowFunc) {
            tokens.push({ type: 'function', value: word })
          } else {
            tokens.push({ type: 'variable', value: word })
          }
        } else {
          // Default to variable
          tokens.push({ type: 'variable', value: word })
        }
      }
      continue
    }

    // Unknown character - treat as punctuation
    tokens.push({ type: 'punctuation', value: char })
    i++
  }

  return tokens
}

/**
 * Render tokenized code with syntax highlighting
 */
export function renderHighlightedCode(code: string): React.ReactNode {
  // Normaliser les sauts de ligne (Windows \r\n -> Unix \n)
  const normalizedCode = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const tokens = tokenizeCode(normalizedCode)

  return tokens.map((token, index) => {
    if (token.type === 'whitespace') {
      return <React.Fragment key={index}>{token.value}</React.Fragment>
    }

    return (
      <span key={index} className={styles[token.type] || ''}>
        {token.value}
      </span>
    )
  })
}
