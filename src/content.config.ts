import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()).default([]),
        role: z.string().default('Design & développement'),
        techStack: z.array(z.string()).default([]),
        image: image().optional(),
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        featured: z.boolean().default(false),
        status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
    }),
});

const stackCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/stack' }),
    schema: z.object({
        categories: z.array(
            z.object({
                name: z.string(),
                techs: z.array(
                    z.object({
                        name: z.string(),
                        icon: z.string().optional(),
                        level: z.number().min(1).max(5),
                        years: z.number().optional(),
                    })
                ),
            })
        ),
    }),
});

const aboutCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/about' }),
    schema: z.object({
        headline: z.string(),
        bio: z.array(z.string()),
        hobbies: z.array(z.object({ label: z.string(), description: z.string() })),
        experiences: z.array(
            z.object({ role: z.string(), company: z.string(), period: z.string() })
        ),
        studies: z.array(
            z.object({ degree: z.string(), school: z.string(), period: z.string() })
        ),
    }),
});

const certificationsCollection = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/certifications' }),
    schema: ({ image }) => z.object({
        items: z.array(
            z.object({
                title: z.string(),
                description: z.string(),
                status: z.enum(['done', 'wip']),
                badge: z.string(),
                link: z.string().optional(),
                linkLabel: z.string().default('Voir la certification'),
                image: image().optional(),
            })
        ),
    }),
});

export const collections = {
    projects: projectsCollection,
    stack: stackCollection,
    about: aboutCollection,
    certifications: certificationsCollection,
};