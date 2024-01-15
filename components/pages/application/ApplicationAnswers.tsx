import { Box, Checkbox, Textarea, TextInput } from "@mantine/core"
import { useTranslation } from "next-i18next"
import Application from "../../types/application"
import Form from "../../types/form"

export default function ApplicationAnswers({ form, application}: {form: Form, application: Application}) {
    
    const { t } = useTranslation('common')
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {
                form.fields.map((field, index) => {
                    return (
                        <Box key={index}>
                            {field.type == 'shorttext' && 
                                <TextInput 
                                    id={field.id}
                                    label={field.label} 
                                    description={field.description} 
                                    required={field.required}
                                    value={application.answers[field.id]}
                                    error={field.required && !application.answers[field.id] ? t("application.not-answered") : undefined}
                                    disabled
                                />
                            }
                            {field.type == 'longtext' &&
                                <Textarea 
                                    id={field.id}
                                    label={field.label} 
                                    description={field.description} 
                                    required={field.required} 
                                    value={application.answers[field.id]}
                                    error={field.required && !application.answers[field.id] ? t("application.not-answered") : undefined}
                                    disabled
                                    autosize 
                                    minRows={5}
                                />
                            }
                            {field.type == 'checkbox' &&
                                <Checkbox 
                                    id={field.id}
                                    label={field.label} 
                                    checked={`${application.answers[field.id]}` === 'true'}
                                    disabled
                                />
                            }
                        </Box>
                    )
                })
            }
        </Box>
    )
}