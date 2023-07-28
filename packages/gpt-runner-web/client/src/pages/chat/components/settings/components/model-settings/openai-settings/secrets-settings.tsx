import { ChatModelType, DEFAULT_API_BASE_PATH } from '@nicepkg/gpt-runner-shared/common'
import type { OpenaiSecrets } from '@nicepkg/gpt-runner-shared/common'
import { type FC, memo } from 'react'
import { VSCodeLink } from '@vscode/webview-ui-toolkit/react'
import { useTranslation } from 'react-i18next'
import { HookFormInput } from '../../../../../../../components/hook-form/hook-form-input'
import { HookFormTextarea } from '../../../../../../../components/hook-form/hook-form-textarea'
import { BaseSecretsSettings } from '../base-secrets-settings'
import type { BaseSecretsFormData, BaseSecretsSettingsFormItemConfig } from '../base-secrets-settings'

interface FormData extends Pick<OpenaiSecrets, 'apiKey' | 'accessToken' | 'basePath'>, BaseSecretsFormData {
}

export interface OpenaiSecretsSettingsProps {
}

export const OpenaiSecretsSettings: FC<OpenaiSecretsSettingsProps> = memo((props) => {
  const { t } = useTranslation()

  const formConfig: BaseSecretsSettingsFormItemConfig<FormData>[] = [
    {
      name: 'apiKey',
      buildView: ({ useFormReturns: { control, formState }, currentVendorConfig }) => {
        return <>
          <HookFormInput
            label={t('chat_page.openai_api_key')}
            placeholder={t('chat_page.openai_api_key_placeholder')}
            name="apiKey"
            disabled={Boolean(currentVendorConfig?.vendorSecrets)}
            errors={formState.errors}
            control={control}
            type="password"
          />
        </>
      },
    },
    {
      name: 'basePath',
      buildView: ({ useFormReturns: { control, formState }, currentVendorConfig }) => {
        return <>
          <HookFormInput
            label={t('chat_page.openai_api_base_path')}
            placeholder={DEFAULT_API_BASE_PATH[ChatModelType.Openai]}
            name="basePath"
            disabled={Boolean(currentVendorConfig?.vendorSecrets)}
            errors={formState.errors}
            control={control}
          />
        </>
      },
    }, {
      name: 'accessToken',
      buildView: ({ useFormReturns: { control, formState }, currentVendorConfig }) => {
        return <>
          <HookFormTextarea
            label={t('chat_page.openai_access_token')}
            name="accessToken"
            disabled={Boolean(currentVendorConfig?.vendorSecrets)}
            placeholder={t('chat_page.openai_access_token_placeholder')}
            errors={formState.errors}
            control={control}
          />
          <div>
            {t('chat_page.openai_get_access_token_tips')} <VSCodeLink href="https://chat.openai.com/api/auth/session" target="_blank" rel="noreferrer">https://chat.openai.com/api/auth/session</VSCodeLink>
          </div>
        </>
      },
    },
  ]

  return <BaseSecretsSettings modelType={ChatModelType.Openai} formConfig={formConfig} />
})

OpenaiSecretsSettings.displayName = 'OpenaiSecretsSettings'
