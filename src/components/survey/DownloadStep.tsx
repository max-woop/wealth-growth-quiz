import React, { useEffect } from 'react';
import { Smartphone, Download, Apple, Play } from 'lucide-react';
import { useSurvey } from '../../context/SurveyContext';
import { trackFacebookEvent, FacebookEvents } from '../../utils/facebookPixel';

interface DownloadStepProps {
  restart: () => void;
}

const DownloadStep: React.FC<DownloadStepProps> = ({ restart }) => {
  const { t, language } = useSurvey();

  // Get the appropriate PDF URL based on language
  const getGuideUrl = () => {
    switch (language) {
      case 'es':
        return 'https://promo.libertex.org/lp/es-lm/trading-guide/pdf/LBX-guide-ES-AR.pdf';
      case 'ru':
        return 'https://promo.libertex.org/lp/es-lm/trading-guide/pdf/LBX-guide-RU%28CIS%29.pdf';
      case 'en':
      default:
        return 'https://promo.libertex.org/lp/es-lm/trading-guide/pdf/LBX-guide-ES-AR.pdf';
    }
  };

  // Track guide download clicks
  const handleGuideDownload = () => {
    trackFacebookEvent(FacebookEvents.GUIDE_DOWNLOAD_CLICKED);
    
    // Track additional Meta pixel event for Guide download
    trackFacebookEvent('Purchase', {
      content_name: 'Trading Guide Download',
      content_category: 'guide_download',
      content_type: 'pdf',
      value: 97,
      currency: 'USD'
    });
    
    // Open the guide URL in a new tab
    window.open(getGuideUrl(), '_blank');
  };

  // Track app store clicks
  const handleAppStoreClick = (store: string) => {
    trackFacebookEvent('AppStoreClick', {
      content_name: 'App Store Click',
      store: store
    });
    
    // Track additional Facebook event for app downloads
    trackFacebookEvent('InitiateCheckout', {
      content_name: 'Mobile App Download',
      content_category: 'app_download',
      content_type: 'mobile_app',
      store: store,
      value: 0,
      currency: 'USD'
    });
  };

  // Get app download URLs based on language
  const getAppStoreUrls = () => {
    switch (language) {
      case 'ru':
        return {
          ios: 'https://lbxfcil.onelink.me/O6uJ/r80xfrti',
          android: 'https://lbxfcil.onelink.me/O6uJ/r80xfrti'
        };
      case 'es':
        return {
          ios: 'https://lbxfcil.onelink.me/O6uJ/vmacbwsg',
          android: 'https://lbxfcil.onelink.me/O6uJ/vmacbwsg'
        };
      case 'en':
      default:
        return {
          ios: 'https://apps.apple.com/app/libertex-online-trading/id1012171869',
          android: 'https://play.google.com/store/apps/details?id=com.libertex.mobiletrader'
        };
    }
  };

  const appUrls = getAppStoreUrls();
  return (
    <div className="animate-fadeIn py-4 px-3 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-[#00B915] to-[#00A012] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
          <span className="text-sm font-bold">✅ {language === 'ru' ? 'ГОТОВО' : language === 'es' ? 'LISTO' : 'READY'}</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {language === 'ru' ? 'Скачайте приложение Libertex' : 
           language === 'es' ? 'Descarga la aplicación Libertex' : 
           'Download the Libertex App'}
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
          {language === 'ru' ? 'Начните торговать прямо сейчас с профессиональными инструментами и персональными рекомендациями' : 
           language === 'es' ? 'Comienza a operar ahora mismo con herramientas profesionales y recomendaciones personalizadas' : 
           'Start trading now with professional tools and personalized recommendations'}
        </p>
      </div>

      {/* App Download Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4">
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {language === 'ru' ? 'Мобильное приложение' : 
             language === 'es' ? 'Aplicación móvil' : 
             'Mobile App'}
          </h2>
          <p className="text-gray-600">
            {language === 'ru' ? 'Торгуйте в любое время и в любом месте' : 
             language === 'es' ? 'Opera en cualquier momento y lugar' : 
             'Trade anytime, anywhere'}
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a
            href={appUrls.ios}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleAppStoreClick('App Store')}
            className="flex items-center justify-center gap-3 bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Apple className="w-6 h-6" />
            <div className="text-left">
              <div className="text-xs opacity-75">
                {language === 'ru' ? 'Скачать в' : 
                 language === 'es' ? 'Descargar en' : 
                 'Download on the'}
              </div>
              <div className="text-sm font-semibold">App Store</div>
            </div>
          </a>

          <a
            href={appUrls.android}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleAppStoreClick('Google Play')}
            className="flex items-center justify-center gap-3 bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Play className="w-6 h-6" />
            <div className="text-left">
              <div className="text-xs opacity-75">
                {language === 'ru' ? 'Скачать в' : 
                 language === 'es' ? 'Descargar en' : 
                 'Get it on'}
              </div>
              <div className="text-sm font-semibold">Google Play</div>
            </div>
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">📱</div>
            <div className="text-sm font-medium text-gray-900">
              {language === 'ru' ? 'Удобный интерфейс' : 
               language === 'es' ? 'Interfaz intuitiva' : 
               'User-friendly'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium text-gray-900">
              {language === 'ru' ? 'Быстрое исполнение' : 
               language === 'es' ? 'Ejecución rápida' : 
               'Fast execution'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm font-medium text-gray-900">
              {language === 'ru' ? 'Безопасность' : 
               language === 'es' ? 'Seguridad' : 
               'Secure'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="text-center space-y-4">
        <button
          onClick={restart}
          className="text-gray-500 hover:text-[#4F46E5] transition-colors text-sm underline font-medium"
        >
          {language === 'ru' ? 'Пройти тест заново' : 
           language === 'es' ? 'Repetir el test' : 
           'Retake Quiz'}
        </button>
      </div>

      {/* Risk Warning */}
      <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs">⚠</span>
          </div>
          <div>
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-800">
                {language === 'ru' ? 'Предупреждение о рисках:' : 
                 language === 'es' ? 'Advertencia de riesgo:' : 
                 'Risk Warning:'}
              </strong>{' '}
              {language === 'ru' ? 'CFD являются сложными инструментами и несут высокий риск быстрой потери денег из-за кредитного плеча. 74-89% счетов розничных инвесторов теряют деньги при торговле CFD. Вы должны понимать, как работают CFD, и можете ли вы позволить себе принять высокий риск потери ваших денег.' : 
               language === 'es' ? 'Los CFD son instrumentos complejos y conllevan un alto riesgo de perder dinero rápidamente debido al apalancamiento. Entre el 74% y el 89% de las cuentas de inversores minoristas pierden dinero al operar con CFD. Debe considerar si comprende cómo funcionan los CFD y si puede permitirse asumir el alto riesgo de perder su dinero.' : 
               'CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 74-89% of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadStep;