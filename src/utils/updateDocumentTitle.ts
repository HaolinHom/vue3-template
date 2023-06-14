import { APP_TITLE } from '@/constants/env';

function updateDocumentTitle(title?: string) {
  document.title = title ? title + ' ' + APP_TITLE : APP_TITLE;
}

export default updateDocumentTitle;
