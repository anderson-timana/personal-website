import { z, defineCollection } from 'astro:content';

const caseStudiesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        seoTitle: z.string().max(60, "SEO Title must be 60 characters or less"),
        metaDescription: z.string().max(160, "Meta Description must be 160 characters or less"),
        visualRank: z.enum(['V1', 'V2', 'V3', 'V4', 'V5']),
        isDraft: z.boolean(),

        // Case study specific fields
        hook: z.string().optional(),
        caseTitle: z.string(),
        verdict: z.string(),
        strategicAction: z.string().optional(),
        liveSiteUrl: z.string().url().optional(),
        repoUrl: z.string().url().optional(),
        
        // Sorting and Filtering
        showcase: z.array(z.string()).default(['main']),
        pubDate: z.coerce.date().optional(),
        thumbnail: z.string().optional(),
        workflow: z.enum(['audits', 'digital-assets', 'development', 'other']).default('other'),
        sector: z.enum(['finance', 'ecommerce', 'industrial', 'tech', 'startup', 'other']).default('other'),
        tags: z.array(z.string()).default([]),
    }),
});

const servicesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        seoTitle: z.string().max(60, "SEO Title must be 60 characters or less"),
        metaDescription: z.string().max(160, "Meta Description must be 160 characters or less"),
        visualRank: z.enum(['V1', 'V2', 'V3', 'V4', 'V5']),
        isDraft: z.boolean(),

        // Service specific fields
        serviceTitle: z.string(),
        priceLabel: z.string(),
        scope: z.string(),
        audience: z.enum(['web-dev', 'fractional-cto']).optional(),
        category: z.string().optional(),
        order: z.number().optional(),
        ctaUrl: z.string().optional(),
    }),
});

const legalCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        lastUpdated: z.string(),
    }),
});

export const collections = {
    'case-studies': caseStudiesCollection,
    'services': servicesCollection,
    'legal': legalCollection,
};
