import { useTranslation } from 'next-i18next';
import Head from 'next/head'

import config from '../../config.json';

const Meta = ({ title, keywords, description, icon }: { title: string, keywords: string, description: string, icon: string; }) => {

  const { t } = useTranslation('common')
  return (
    <Head>
      <meta name="theme-color" content={config.meta.theme_color}/>

      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
    
      <meta name="Language" content="en" />
      <meta httpEquiv="Content-Language" content="en" />

      <meta charSet='utf-8' />
      <link rel='icon' href={icon} />
      <title>{t('title', { title: title })}</title>

      <meta property='og:title' content={title}/>
      <meta property='og:site_name' content={t('title', { title: title })}/>
      <meta property="og:url" content={config.meta.opengraph.url}/>
      <meta property='og:description' content={description}/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content={config.meta.opengraph.image}/>

      <meta property='twitter:card' content='summary_large_image'/>
      <meta property='twitter:url' content={config.meta.opengraph.url}/>
      <meta property='twitter:title' content={title}/>
      <meta property="twitter:description" content={description}/>
      <meta property='twitter:image' content={config.meta.opengraph.image}/>

    </Head>
  )
}

Meta.defaultProps = {
  title: config.meta.default_title,
  keywords: config.meta.keywords,
  description: config.meta.description,
  icon: config.meta.favicon
}

export default Meta