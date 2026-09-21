#!/usr/bin/env node

/**
 * Content Audit Script
 * Scans all content files for unresolved placeholders.
 * Run with: npm run content:audit
 */

import * as fs from 'fs'
import * as path from 'path'

interface AuditResult {
  file: string
  line: number
  field: string
  value: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content')
const results: AuditResult[] = []

function scanFile(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const relativePath = path.relative(process.cwd(), filePath)

  lines.forEach((line, index) => {
    // Check for isPlaceholder: true
    if (line.includes('isPlaceholder: true') || line.includes('isPlaceholder:true')) {
      results.push({
        file: relativePath,
        line: index + 1,
        field: 'isPlaceholder',
        value: line.trim(),
      })
    }

    // Check for bracketed placeholder labels like [FOUNDATION INTRODUCTION]
    const bracketMatches = line.match(/\[([A-Z][A-Z\s/']+)\]/g)
    if (bracketMatches) {
      bracketMatches.forEach((match) => {
        results.push({
          file: relativePath,
          line: index + 1,
          field: 'placeholder label',
          value: match,
        })
      })
    }

    // Check for value: null (placeholder stats)
    if (line.includes('value: null')) {
      results.push({
        file: relativePath,
        line: index + 1,
        field: 'null value',
        value: line.trim(),
      })
    }

    // Check for status: 'draft'
    if (line.includes("status: 'draft'") || line.includes('status: "draft"')) {
      results.push({
        file: relativePath,
        line: index + 1,
        field: 'draft status',
        value: line.trim(),
      })
    }
  })
}

function scanDirectory(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    console.log(`\n⚠️  Content directory not found: ${dirPath}\n`)
    return
  }

  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      scanDirectory(fullPath)
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      scanFile(fullPath)
    }
  }
}

// Run audit
console.log('\n📋 Ecodite Foundation — Content Audit')
console.log('=' .repeat(50))

scanDirectory(CONTENT_DIR)

if (results.length === 0) {
  console.log('\n✅ No unresolved placeholders found!\n')
} else {
  console.log(`\n⚠️  Found ${results.length} unresolved placeholder(s):\n`)

  // Group by file
  const grouped = results.reduce<Record<string, AuditResult[]>>((acc, result) => {
    if (!acc[result.file]) {
      acc[result.file] = []
    }
    acc[result.file].push(result)
    return acc
  }, {})

  for (const [file, items] of Object.entries(grouped)) {
    console.log(`\n  📄 ${file}`)
    for (const item of items) {
      console.log(`     L${item.line}: [${item.field}] ${item.value}`)
    }
  }

  console.log(`\n  Total: ${results.length} placeholder(s) across ${Object.keys(grouped).length} file(s)`)
  console.log('  These items need official content before production deployment.\n')
}

process.exit(results.length > 0 ? 1 : 0)
