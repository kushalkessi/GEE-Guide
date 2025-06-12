import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GEE Guide",
  // base: '/GEE/',
  lang: 'en-US',
  description: "An e-learning platform for learning Google Earth Engine (GEE) with hands-on examples and real-world projects.",

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/apn.png' }] // ✅ Correct position
  ],

  themeConfig: {
    logo: { src: '/images/earth-engine-logo.png'},
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: 'algolia',
      options: {
        appId: '8J64VVRP8K',
        apiKey: '52f578a92b88ad6abde815aae2b0ad7c',
        indexName: 'vitepress'
      }
    },

    nav: [
    { text: 'Home', link: '/' },
    { text: 'Content', link: '/content/introduction' },
    { text: 'Antarikchya', link: 'https://antarikchya.org.np/' },
    ],

    sidebar: [
      {
        text: 'GEE',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/content/introduction' },
          { text: 'Getting Started', link: '/content/getting_started' }
        ]
      },

      {
        text: 'GEE Basic',
        collapsed: true,
        items: [
          { text: 'Basic Coding in GEE', link: '/content/basic/basic_js' },
          { text: 'Earth Engine Objects', link: '/content/basic/earth_engine_object' }, 
          { text: 'Feature Collection', link: '/content/basic/feature_collection' }, 
          { text: 'Image Collection', link: '/content/basic/image_collection' }, 
          { text: 'Composite & Clip Image', link: '/content/basic/composite_image_&_clip' }, 
          { text: 'Import and Export', link: '/content/basic/import_export' }, 
        ]
      }, 

      {
        text: 'GEE Intermidiate',
        collapsed: true,
        items: [
          { text: 'Working With Satellite Data', link: '/content/intermidiate/working_with_satellite_data' },
          { text: 'Cloud Masking', link: '/content/intermidiate/cloud_masking' },
          { text: 'Calculating Indices', link: '/content/intermidiate/calculating_indices' },
          { text: 'Analysis and Mapping', link: '/content/intermidiate/analysis_and_mapping' },
          { text: 'Supervised Classification', link: '/content/intermidiate/supervised_classification' },
          { text: 'Change Detection', link: '/content/intermidiate/change_detection' },
          { text: 'Earth Engine App', link: '/content/intermidiate/earth_engine_app' },
          { text: 'UI Elements', link: '/content/intermidiate/ui_elements' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Antarikchya-Prathisthan-Nepal'},
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/antarikchya/'},
      { icon: 'facebook', link: 'https://www.facebook.com/antarikchya'},
      { icon: 'instagram', link: 'https://www.instagram.com/antarikchya/'},
      { icon: 'x', link: 'https://x.com/antarikchya'}
    ], 

    editLink: {
      pattern: 'https://github.com/kushalkessi',
      text: 'Edit this page on GitHub'
    },

     lastUpdated: {
      text: 'Last updated on',
    },

    outline: [2, 3], // shows h2 and h3 in TOC

    footer: {
      message: 'GEE User Guide',
      copyright: `Copyright © ${new Date().getFullYear()} Antarikchya`
    }

  }
})
