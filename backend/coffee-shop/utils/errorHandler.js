// Função para gerar dados de erro específicos
function getErrorData(errorCode, errorType = 'general') {
  const errorData = {
    400: {
      auth: {
        errorCode: '400',
        errorIcon: '⚠️',
        errorTitle: 'Dados Inválidos',
        errorMessage: 'Os dados fornecidos são inválidos ou estão incompletos.',
        solutionTitle: 'Verifique os dados',
        solutionMessage: 'Por favor, verifique se todos os campos foram preenchidos corretamente e tente novamente.',
        backUrl: errorType === 'login' ? '/auth/login' : '/auth/register',
        backText: errorType === 'login' ? 'Voltar ao Login' : 'Voltar ao Cadastro'
      },
      general: {
        errorCode: '400',
        errorIcon: '⚠️',
        errorTitle: 'Requisição Inválida',
        errorMessage: 'A requisição enviada contém dados inválidos.',
        solutionTitle: 'Verifique os dados',
        solutionMessage: 'Por favor, verifique os dados enviados e tente novamente.',
        backUrl: '/',
        backText: 'Voltar'
      }
    },
    401: {
      auth: {
        errorCode: '401',
        errorIcon: '🔒',
        errorTitle: 'Acesso Negado',
        errorMessage: 'Usuário ou senha inválidos. Verifique suas credenciais e tente novamente.',
        solutionTitle: 'Credenciais incorretas',
        solutionMessage: 'Certifique-se de que o usuário e senha estão corretos. Caso tenha esquecido sua senha, entre em contato conosco.',
        backUrl: '/auth/login',
        backText: 'Tentar Novamente'
      },
      general: {
        errorCode: '401',
        errorIcon: '🔒',
        errorTitle: 'Não Autorizado',
        errorMessage: 'Você não tem permissão para acessar este recurso.',
        solutionTitle: 'Acesso restrito',
        solutionMessage: 'Faça login com uma conta válida para acessar esta página.',
        backUrl: '/auth/login',
        backText: 'Fazer Login'
      }
    },
    404: {
      general: {
        errorCode: '404',
        errorIcon: '🔍',
        errorTitle: 'Página Não Encontrada',
        errorMessage: 'A página que você está procurando não existe ou foi movida.',
        solutionTitle: 'Página inexistente',
        solutionMessage: 'Verifique o endereço digitado ou use o menu de navegação para encontrar o que procura.',
        backUrl: '/',
        backText: 'Página Inicial'
      }
    },
    500: {
      auth: {
        errorCode: '500',
        errorIcon: '🛠️',
        errorTitle: 'Erro no Servidor',
        errorMessage: 'Ocorreu um erro interno no servidor durante a operação de autenticação.',
        solutionTitle: 'Problema técnico',
        solutionMessage: 'Nosso servidor está com problemas temporários. Tente novamente em alguns minutos.',
        backUrl: errorType === 'login' ? '/auth/login' : '/auth/register',
        backText: 'Tentar Novamente'
      },
      general: {
        errorCode: '500',
        errorIcon: '🛠️',
        errorTitle: 'Erro Interno do Servidor',
        errorMessage: 'Ocorreu um erro interno no servidor.',
        solutionTitle: 'Problema técnico',
        solutionMessage: 'Nosso servidor está com problemas temporários. Tente novamente em alguns minutos.',
        backUrl: '/',
        backText: 'Página Inicial'
      }
    }
  };

  // Casos especiais para erros de validação específicos
  const validationErrors = {
    'missing_fields': {
      errorCode: '400',
      errorIcon: '📝',
      errorTitle: 'Campos Obrigatórios',
      errorMessage: 'Todos os campos são obrigatórios. Por favor, preencha todos os dados solicitados.',
      solutionTitle: 'Preencha todos os campos',
      solutionMessage: 'Certifique-se de que todos os campos estão preenchidos antes de continuar.',
      backUrl: errorType === 'login' ? '/auth/login' : '/auth/register',
      backText: errorType === 'login' ? 'Voltar ao Login' : 'Voltar ao Cadastro'
    },
    'invalid_email': {
      errorCode: '400',
      errorIcon: '📧',
      errorTitle: 'Email Inválido',
      errorMessage: 'O formato do email fornecido é inválido. Por favor, digite um email válido.',
      solutionTitle: 'Formato de email incorreto',
      solutionMessage: 'Certifique-se de que o email contém @ e um domínio válido (ex: usuario@exemplo.com).',
      backUrl: '/auth/register',
      backText: 'Voltar ao Cadastro'
    },
    'short_password': {
      errorCode: '400',
      errorIcon: '🔑',
      errorTitle: 'Senha Muito Curta',
      errorMessage: 'A senha deve ter no mínimo 6 caracteres para garantir a segurança da sua conta.',
      solutionTitle: 'Senha insegura',
      solutionMessage: 'Escolha uma senha com pelo menos 6 caracteres, incluindo letras e números se possível.',
      backUrl: '/auth/register',
      backText: 'Voltar ao Cadastro'
    },
    'user_exists': {
      errorCode: '409',
      errorIcon: '👤',
      errorTitle: 'Usuário Já Existe',
      errorMessage: 'Já existe um usuário cadastrado com esse nome ou email.',
      solutionTitle: 'Conta já existente',
      solutionMessage: 'Tente fazer login com suas credenciais existentes ou escolha um nome de usuário diferente.',
      backUrl: '/auth/register',
      backText: 'Voltar ao Cadastro'
    },
    'invalid_credentials': {
      errorCode: '401',
      errorIcon: '🔒',
      errorTitle: 'Credenciais Inválidas',
      errorMessage: 'O usuário ou senha fornecidos estão incorretos.',
      solutionTitle: 'Dados de login incorretos',
      solutionMessage: 'Verifique se o nome de usuário e senha estão corretos e tente novamente.',
      backUrl: '/auth/login',
      backText: 'Tentar Novamente'
    }
  };

  // Retorna erro específico se existir
  if (validationErrors[errorCode]) {
    return validationErrors[errorCode];
  }

  // Retorna erro por código HTTP
  if (errorData[errorCode]) {
    return errorData[errorCode][errorType] || errorData[errorCode].general;
  }

  // Erro padrão
  return {
    errorCode: errorCode || '500',
    errorIcon: '❌',
    errorTitle: 'Erro Inesperado',
    errorMessage: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    solutionTitle: 'Problema desconhecido',
    solutionMessage: 'Tente novamente em alguns minutos ou entre em contato conosco se o problema persistir.',
    backUrl: '/',
    backText: 'Página Inicial'
  };
}

module.exports = { getErrorData };
