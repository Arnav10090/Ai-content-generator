export default [
    {
        name: 'Blog Title',
        desc: 'Generate creative, SEO-optimized blog titles tailored to your niche and outline.',
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/4186/4186534.png',
        aiPrompt: `Generate 5 creative, SEO-optimized blog title ideas based on the provided niche and outline.
Format the output for a rich text editor with the following style:
- Start with a bold heading: **Top Blog Title Ideas**
- Use bullet points for each title.
- Bold important keywords in each title.
- Add spacing between entries for readability.
- Output in HTML or Markdown.`,
        slug: 'generate-blog-title',
        form: [
            {
                label: 'Enter your blog niche',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Enter blog outline',
                field: 'textarea',
                name: 'outline',
            }
        ]
    },
    {
        name: 'Blog Content',
        desc: 'Create full-length, well-structured blog posts with rich formatting and SEO best practices.',
        category: 'blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/4905/4905454.png',
        slug: 'blog-content-generation',
        aiPrompt: `Write a full-length blog post based on the provided topic and outline.
Use rich formatting as follows:
- Title: <h2>Main Blog Title</h2>
- Use headings (<h3>) and subheadings.
- Emphasize key points with <b>bold</b> tags.
- Structure with paragraphs, bullets, and line breaks.
- Format using HTML or Markdown.`,
        form: [
            {
                label: 'Enter your blog topic',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Enter blog Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'Get a list of unique and engaging blog topic ideas for your chosen niche.',
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/11497/11497847.png',
        slug: 'blog-topic-idea',
        aiPrompt: `Suggest 5 creative blog topic ideas based on the user's niche.
Style the response using rich formatting:
- Start with a title: **Blog Topic Suggestions**
- Each idea should be a bullet point.
- Use <b> to emphasize unique keywords in the titles.
- Separate lines and space clearly for readability.`,
        form: [
            {
                label: 'Enter your Niche',
                field: 'input',
                name: 'niche',
                required: true
            },
        ]
    },
    {
        name: 'Youtube SEO Title',
        desc: 'Generate catchy, SEO-friendly YouTube video titles to boost your video rankings.',
        category: 'Youtube Tools',
        icon: 'https://cdn-icons-png.flaticon.com/128/402/402075.png',
        slug: 'youtube-seo-title',
        aiPrompt: `Create 5 SEO-optimized YouTube video titles based on provided keywords and description.
Format the output with:
- Heading: <h2>SEO Title Ideas</h2>
- Use <ul><li> HTML bullet list tags.
- Highlight strong keywords in <b>bold</b>.
- Ensure clickable and engaging phrasing.`,
        form: [
            {
                label: 'Enter your youtube video topic keyowords',
                field: 'input',
                name: 'keywords',
                required: true
            },
            {
                label: 'Enter youtube description Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Youtube Description',
        desc: 'Write compelling YouTube video descriptions with emojis and formatting to attract viewers.',
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111748.png',
        slug: 'youtube-description',
        aiPrompt: `Generate a short (4-5 line) YouTube video description using the topic and outline.
Include the following styling:
- Use <p> paragraphs with line spacing.
- Add relevant emojis to make it eye-catching.
- Highlight important points in <b>bold</b>.
- Format for rich text editor or HTML.`,
        form: [
            {
                label: 'Enter your blog topic/title',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Enter youtube Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Youtube Tags',
        desc: 'Get a set of relevant and high-performing tags for your YouTube videos.',
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/4674/4674918.png',
        slug: 'youtube-tag',
        aiPrompt: `Generate 10 relevant YouTube tags based on the video title and optional outline.
Style the output like:
- Heading: **Suggested YouTube Tags**
- Use bullet points (• or <ul><li>)
- Use bold for top-performing tags.
- Format in rich text or HTML tags.`,
        form: [
            {
                label: 'Enter your youtube title',
                field: 'input',
                name: 'title',
                required: true
            },
            {
                label: 'Enter youtube video Outline here (Optional)',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Rewrite Article (Plagiarism Free)',
        desc: 'Rewrite articles or blog posts to be original, plagiarism-free, and human-readable.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3131/3131607.png',
        category: 'Rewriting Tool',
        slug: 'rewrite-article',
        aiPrompt: `Rewrite the given article to be 100% original, plagiarism-free, and human-readable.
Format instructions:
- Keep the structure intact with paragraph spacing.
- Emphasize changes using <b>bold</b> where major improvements are made.
- Return output in clean, readable HTML or rich text.`,
        form: [
            {
                label: '🤖 Provide your Article/Blogpost or any other content to rewrite.',
                field: 'textarea',
                name: 'article',
                required: true
            }
        ]
    },
    {
        name: 'Text Improver',
        desc: 'Refine your writing by fixing grammar, simplifying language, and enhancing tone.',
        icon: 'https://cdn-icons-png.flaticon.com/128/1686/1686815.png',
        category: 'Writing Assistant',
        slug: 'text-improver',
        aiPrompt: `Improve the provided text by fixing grammar, simplifying language, and enhancing tone.
Style the output using:
- <p> for paragraphs.
- <b> for key improvements.
- Add spacing and formatting suitable for a rich text editor.`,
        form: [
            {
                label: 'Enter text that you want to re-write or improve',
                field: 'textarea',
                name: 'textToImprove'
            }
        ]
    },
    {
        name: 'Add Emojis to Text',
        desc: 'Enhance your text with relevant and expressive emojis for social media or messaging.',
        icon: 'https://cdn-icons-png.flaticon.com/128/2584/2584606.png',
        category: 'blog',
        slug: 'add-emoji-to-text',
        aiPrompt: `Add relevant and expressive emojis to the provided text while keeping the meaning intact.
Formatting:
- Use <p> or line breaks to separate ideas.
- Place emojis logically and tastefully.
- Keep output suitable for social media posts.`,
        form: [
            {
                label: 'Enter your text to add emojis',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    },
    {
        name: 'Instagram Post Generator',
        desc: 'Create creative and engaging Instagram post captions with keywords and emojis.',
        icon: 'https://cdn-icons-png.flaticon.com/128/15713/15713420.png',
        category: 'blog',
        slug: 'instagram-post-generator',
        aiPrompt: `Generate 3 creative Instagram post captions based on the given keywords.
Format the response with:
- Each post under its own bold heading: **Post 1**, **Post 2**, etc.
- Include emojis and line breaks.
- Make it look like a ready-to-post caption in rich text format.`,
        form: [
            {
                label: 'Enter Keywords for your post',
                field: 'input',
                name: 'keywords',
                required: true
            }
        ]
    },
    {
        name: 'Instagram Hash Tag Generator',
        desc: 'Generate trending and relevant hashtags for your Instagram posts to increase reach.',
        icon: 'https://cdn-icons-png.flaticon.com/128/7045/7045432.png',
        category: 'blog',
        slug: 'instagram-hash-tag-generator',
        aiPrompt: `Generate 15 trending and relevant Instagram hashtags.
Formatting rules:
- Use a section heading: <h3>Top Instagram Hashtags</h3>
- Bullet list each hashtag or group them by relevance.
- Use <b>#hashtag</b> format and keep output rich and clean.`,
        form: [
            {
                label: 'Enter Keywords for your instagram hastag',
                field: 'input',
                name: 'keywords',
                required: true
            }
        ]
    },
    {
        name: 'Instagram Post/Reel Idea',
        desc: 'Get new and trending Instagram post or reel ideas based on your niche.',
        icon: 'https://cdn-icons-png.flaticon.com/128/1029/1029183.png',
        category: 'instagram',
        slug: 'instagram-post-idea-generator',
        aiPrompt: `Suggest 5-10 new and trending Instagram content ideas based on the niche.
Style the ideas with:
- Numbered or bulleted format.
- Start with a bold header: **Instagram Ideas**
- Include emojis and break ideas into short phrases.`,
        form: [
            {
                label: 'Enter Keywords / Niche for your instagram idea',
                field: 'input',
                name: 'keywords',
                required: true
            }
        ]
    },
    {
        name: 'English Grammer Check',
        desc: 'Correct grammar and improve the readability of your English text.',
        icon: 'https://cdn-icons-png.flaticon.com/128/12596/12596700.png',
        category: 'english',
        slug: 'english-grammer-checker',
        aiPrompt: `Correct the grammar and improve readability of the given text.
Use formatting like:
- <p> for paragraphs
- <b> for corrected or improved phrases
- Keep the tone professional and friendly for rich text.`,
        form: [
            {
                label: 'Enter text to correct the grammer',
                field: 'input',
                name: 'inputText',
                required: true
            }
        ]
    },
    {
        name: 'Write Code',
        desc: 'Generate programming code in any language based on your description.',
        icon: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png',
        category: 'Coding',
        slug: 'write-code',
        aiPrompt: `Generate code based on the user's description.
Use formatting:
- Start with a bold heading: **Generated Code**
- Use <pre><code> or Markdown code block for the snippet.
- Add inline comments if useful.`,
        form: [
            {
                label: 'Enter description of code you want along with Programming Lang',
                field: 'textarea',
                name: 'codeDesscripton',
                required: true
            }
        ]
    },
    {
        name: 'Explain Code',
        desc: 'Get detailed, line-by-line explanations for any code snippet.',
        icon: 'https://cdn-icons-png.flaticon.com/128/8488/8488751.png',
        category: 'Coding',
        slug: 'explain-code',
        aiPrompt: `Explain the provided code line-by-line.
Use format:
- <pre><code> for the original code
- Each explanation under a bold heading: **Explanation**
- Use bullet points for clarity.`,
        form: [
            {
                label: 'Enter code which you want to understand',
                field: 'textarea',
                name: 'codeDesscripton',
                required: true
            }
        ]
    },
    {
        name: 'Code Bug Detector',
        desc: 'Analyze your code for bugs and receive suggestions for fixes and improvements.',
        icon: 'https://cdn-icons-png.flaticon.com/128/4426/4426267.png',
        category: 'code-bug-detector',
        slug: 'code-bug-detector',
        aiPrompt: `Analyze the code for bugs and suggest fixes.
Response style:
- Bold heading: **Detected Issues**
- <pre><code> blocks for buggy and corrected code
- Explain each fix below in <p> tags.`,
        form: [
            {
                label: 'Enter code which you want to test bug',
                field: 'textarea',
                name: 'codeInput',
                required: true
            }
        ]
    },
    {
        name: 'Tagline Generator',
        desc: 'Create catchy and creative taglines for your brand, product, or campaign.',
        icon: 'https://cdn-icons-png.flaticon.com/128/2178/2178616.png',
        category: 'Marketting',
        slug: 'tagline-generator',
        aiPrompt: `Generate 5–10 creative and catchy taglines based on the brand name and description.
Format like:
- Heading: **Tagline Ideas**
- Bullet points with <b>highlighted phrases</b>
- Output in clear rich text.`,
        form: [
            {
                label: 'Product/Brand Name',
                field: 'input',
                name: 'productName',
                required: true
            },
            {
                label: 'What you are selling / Marketting',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    },
    {
        name: 'Product Description',
        desc: 'Generate captivating, keyword-rich product descriptions for your e-commerce listings.',
        icon: 'https://cdn-icons-png.flaticon.com/128/679/679922.png',
        category: 'Marketting',
        slug: 'product-description',
        aiPrompt: `Write a compelling e-commerce product description based on the name and details.
Use the format:
- Title in <h3>
- Features in bullet list with <b>bold highlights</b>
- Output optimized for rich text editor and readability.`,
        form: [
            {
                label: 'Product Name',
                field: 'input',
                name: 'productName',
                required: true
            },
            {
                label: 'Product Details',
                field: 'textarea',
                name: 'outline',
                required: true
            }
        ]
    }
]