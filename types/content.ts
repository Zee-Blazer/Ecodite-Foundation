// =============================================================================
// Content Type Definitions
// Ecodite Educational Foundation
// =============================================================================

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export interface PlaceholderText {
  value: string
  isPlaceholder: boolean
  status?: 'draft' | 'approved'
}

export interface MediaSlot {
  src: string
  alt: string
  ratio: string // e.g. "4:5", "16:9", "21:9"
  description: string // art direction notes
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// Site Configuration
// ---------------------------------------------------------------------------

export type SocialPlatform =
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'youtube'

export interface SocialLink {
  platform: SocialPlatform
  url: string // empty = hidden
  label: string
}

export interface ContactInfo {
  address: PlaceholderText
  email: PlaceholderText
  phone: PlaceholderText
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface SiteConfig {
  name: string
  legalName: string
  description: string
  url: string
  contact: ContactInfo
  socialLinks: SocialLink[]
  nav: NavItem[]
  donateEnabled: boolean
  paymentsEnabled: boolean
  searchEnabled: boolean
  showPlaceholders: boolean
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export interface HeroData {
  eyebrow: string
  headline: PlaceholderText
  supportCopy: PlaceholderText
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  media: MediaSlot
}

export interface HomeIntro {
  eyebrow: string
  headline: PlaceholderText
  body: PlaceholderText
  link: { label: string; href: string }
  image: MediaSlot
}

export interface HomeStatement {
  text: PlaceholderText
  image?: MediaSlot
}

export interface HomeChairmanPreview {
  portrait: MediaSlot
  eyebrow: string
  welcomeHeadline: string
  quote: PlaceholderText
  signature: PlaceholderText
  name: PlaceholderText
  title: string
  link: { label: string; href: string }
}

export interface HomeSupportCta {
  headline: PlaceholderText
  donateCta: { label: string; href: string }
  partnerCta: { label: string; href: string }
  volunteerCta: { label: string; href: string }
}

export interface HomeNewsletterContent {
  headline: string
  placeholder: string
  buttonLabel: string
}

// ---------------------------------------------------------------------------
// Programs
// ---------------------------------------------------------------------------

export type ProgramCategory =
  | 'Learning & Education'
  | 'Digital Skills'
  | 'Creativity & Innovation'
  | 'Skills Development'
  | 'Mentorship & Personal Development'
  | 'Community Development'

export interface Program {
  slug: string
  title: PlaceholderText
  description: PlaceholderText
  category: ProgramCategory
  image: MediaSlot
  featured: boolean
  introduction?: PlaceholderText
  whatItDoes?: PlaceholderText
  whoItServes?: PlaceholderText
  objectives?: PlaceholderText[]
  activities?: PlaceholderText[]
  gallery?: MediaSlot[]
  impact?: ImpactStat[]
  relatedNews?: string[]
  relatedEvents?: string[]
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export interface NewsArticle {
  slug: string
  title: PlaceholderText
  excerpt: PlaceholderText
  body: PlaceholderText
  date: string // ISO date
  category: string
  author?: PlaceholderText
  featuredImage: MediaSlot
  relatedPosts?: string[]
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export type EventStatus = 'upcoming' | 'ongoing' | 'past'

export interface EcoditeEvent {
  slug: string
  title: PlaceholderText
  description: PlaceholderText
  date: string // ISO date
  endDate?: string
  location: PlaceholderText
  status: EventStatus // computed from dates
  image?: MediaSlot
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export type GalleryCategory =
  | 'All'
  | 'Education'
  | 'Programs'
  | 'Events'
  | 'Community'
  | 'Workshops'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  caption?: string
  category: GalleryCategory
  width: number
  height: number
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// Leadership
// ---------------------------------------------------------------------------

export interface LeadershipMember {
  name: PlaceholderText
  role: PlaceholderText
  bio?: PlaceholderText
  image: MediaSlot
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// Impact
// ---------------------------------------------------------------------------

export interface ImpactStat {
  value: number | null // null = placeholder, renders as em dash
  label: string
  prefix?: string
  suffix?: string
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// Chairman
// ---------------------------------------------------------------------------

export interface ChairmanData {
  name: PlaceholderText
  title: PlaceholderText
  portrait: MediaSlot
  welcomeMessage: PlaceholderText
  biography: PlaceholderText
  philosophy: PlaceholderText
  foundationVision: PlaceholderText
  signature?: MediaSlot
  video?: MediaSlot
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export interface AboutValue {
  title: PlaceholderText
  description: PlaceholderText
  isPlaceholder: boolean
}

export interface AboutData {
  mission: PlaceholderText
  vision: PlaceholderText
  values: AboutValue[]
  approach: PlaceholderText
  heroImage: MediaSlot
  whoWeAre: PlaceholderText
}

// ---------------------------------------------------------------------------
// Donate
// ---------------------------------------------------------------------------

export interface DonateAmount {
  value: number
  label: string
  description?: string
}

export interface DonateData {
  headline: PlaceholderText
  message: PlaceholderText
  amounts: DonateAmount[]
  currency: 'NGN' | 'USD'
  currencySymbol: string
  howGiftIsUsed: PlaceholderText
  isPlaceholder: boolean
}

// ---------------------------------------------------------------------------
// Payment Provider
// ---------------------------------------------------------------------------

export interface PaymentInitParams {
  email: string
  amount: number // smallest currency unit (kobo for NGN, cents for USD)
  currency: 'NGN' | 'USD'
  plan?: string // for recurring
  metadata?: Record<string, unknown>
  callbackUrl: string
}

export interface PaymentInitResult {
  success: boolean
  authorizationUrl?: string
  reference?: string
  error?: string
}

export interface PaymentVerifyResult {
  success: boolean
  status: 'success' | 'failed' | 'pending' | 'abandoned'
  amount?: number
  currency?: string
  reference?: string
  error?: string
}

export interface WebhookResult {
  valid: boolean
  event?: string
  data?: Record<string, unknown>
}

export interface PaymentProvider {
  initialize(params: PaymentInitParams): Promise<PaymentInitResult>
  verify(reference: string): Promise<PaymentVerifyResult>
  handleWebhook(body: string, signature: string): Promise<WebhookResult>
}

// ---------------------------------------------------------------------------
// Email / Newsletter Provider
// ---------------------------------------------------------------------------

export interface EmailProvider {
  subscribe(email: string): Promise<{ success: boolean; message: string }>
  unsubscribe(email: string): Promise<{ success: boolean }>
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export interface SearchResult {
  type: 'program' | 'news' | 'event'
  title: string
  excerpt: string
  slug: string
  href: string
  date?: string
  category?: string
}

export interface SearchIndex {
  items: SearchResult[]
  generatedAt: string
}

// ---------------------------------------------------------------------------
// Legal
// ---------------------------------------------------------------------------

export interface LegalPage {
  title: string
  slug: string
  content: PlaceholderText
  lastUpdated: string
}
