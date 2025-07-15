import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Wheat, Truck, ShoppingBasket, ArrowRight } from 'lucide-react';
import { NioSection, NioButton } from '../../components';
import { useNavigate } from 'react-router-dom';

// Utility for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const roles = [
  {
    id: 'transporter',
    title: 'Transporteur',
    subtitle: 'Gérez vos opérations logistiques',
    description: 'Suivez et gérez vos stocks transportés, optimisez vos finances et prenez des décisions éclairées avec des analyses basées sur les données.',
    icon: Truck,
    variant: 'transporter',
    gradient: 'from-pink-500 via-rose-600 to-red-700',
    textColor: 'text-gray-900',
    bgPattern: 'bg-pink-300',
    stats: [
      { label: 'Transporteurs actifs', value: '1.8K+', icon: 'ni ni-users' },
      { label: 'Efficacité logistique', value: '+25%', icon: 'ni ni-trending-up' },
      { label: 'Stocks gérés', value: '10K+/mois', icon: 'ni ni-package' },
    ],
    features: [
      'Gestion des stocks transportés',
      'Suivi financier des opérations',
      'Importation de données CSV/XLSX',
      'Rapports IA pour décisions',
    ],
  },
  {
    id: 'farmer',
    title: 'Agriculteur',
    subtitle: 'Optimisez votre production agricole',
    description: 'Gérez vos parcelles, suivez vos cultures et maximisez vos rendements avec des outils avancés et des prévisions basées sur l’IA.',
    icon: Wheat,
    variant: 'farmer',
    gradient: 'from-green-500 via-emerald-600 to-green-700',
    textColor: 'text-gray-900',
    bgPattern: 'bg-green-300',
    stats: [
      { label: 'Agriculteurs actifs', value: '5.2K+', icon: 'ni ni-users' },
      { label: 'Précision des prévisions', value: '92%', icon: 'ni ni-trending-up' },
      { label: 'Temps économisé', value: '20h/sem', icon: 'ni ni-clock' },
    ],
    features: [
      'Gestion des parcelles sur carte interactive',
      'Suivi météo et alertes en temps réel',
      'Prévisions de rendement basées sur l’IA',
      'Création d’offres et besoins agricoles',
    ],
  },
  {
    id: 'distributor',
    title: 'Distributeur',
    subtitle: 'Connectez producteurs et consommateurs',
    description: 'Créez des offres, gérez vos stocks et recevez des recommandations basées sur l’IA pour optimiser votre chaîne d’approvisionnement.',
    icon: ShoppingBasket,
    variant: 'distributor',
    gradient: 'from-blue-500 via-indigo-600 to-purple-700',
    textColor: 'text-gray-900',
    bgPattern: 'bg-blue-300',
    stats: [
      { label: 'Distributeurs actifs', value: '3.1K+', icon: 'ni ni-users' },
      { label: 'Profit optimisé', value: '+35%', icon: 'ni ni-trending-up' },
      { label: 'Commandes/jour', value: '2.8K', icon: 'ni ni-cart' },
    ],
    features: [
      'Création et matching d’offres',
      'Recommandations basées sur l’IA',
      'Gestion automatisée des stocks',
      'Accès direct aux producteurs',
    ],
  },
];

const NioSectionSignUp = () => {
  const navigate = useNavigate();

  // Define onClick handlers for each role
  const handleRoleClick = (roleId) => {
    localStorage.setItem('role', roleId);
    console.log('Role stored:', localStorage.getItem('role')); // Log the stored role
    navigate('/farmerform');
  };

  return (
    <NioSection className="nk-section-roles py-5 py-lg-7 bg-light">
      <NioSection.Head alignX="center">
        <h2>
          HarvestFlow <span className="text-indigo">S’Adapte à Vous</span>
        </h2>
        <p className="fs-5 text-muted mb-0">
          Que vous cultiviez, transportiez ou distribuiez, notre plateforme vous connecte au cœur de l’agriculture moderne.
        </p>
      </NioSection.Head>
      <NioSection.Content>
        <Row className="g-4 align-items-stretch justify-content-center">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isFarmer = role.id === 'farmer';
            const FloatingIcon = role.id === 'farmer' ? Wheat : role.id === 'transporter' ? Truck : ShoppingBasket;
            return (
              <Col
                key={role.id}
                md={4}
                lg={4}
                xl={4}
                className="d-flex"
              >
                <div
                  className={cn(
                    "role-card rounded-3 w-100 d-flex flex-column",
                    "relative overflow-hidden border border-gray-100",
                    isFarmer ? "shadow-2xl z-10" : "shadow-lg",
                    `reflect-${role.id}`
                  )}
                  style={{
                    background: '#ffffff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    minHeight: '350px',
                  }}
                >
                  {/* Floating Design Element */}
                  <FloatingIcon
                    className={cn(
                      "floating-design absolute top-4 right-4",
                      `float-animation float-delay-${index}`,
                      isFarmer ? "w-10 h-10" : "w-8 h-8"
                    )}
                    style={{
                      fill: `url(#gradient-${role.id})`,
                      stroke: 'none',
                      zIndex: 1,
                    }}
                  />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id={`gradient-${role.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        {role.gradient.split(' ').map((color, i) => (
                          <stop key={i} offset={`${i * 50}%`} stopColor={color.replace('from-', '').replace('via-', '').replace('to-', '')} />
                        ))}
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className={cn("h-[20px]", `bg-gradient-to-r ${role.gradient}`)}></div>
                  <div className="p-3 flex-grow d-flex flex-column">
                    <div>
                      <div
                        className={cn(
                          "rounded-2xl flex items-center justify-center mb-3",
                          `bg-gradient-to-br ${role.gradient}`,
                          "shadow-lg shadow-current/25",
                          isFarmer ? "w-16 h-16" : "w-14 h-14"
                        )}
                      >
                        <Icon className={cn("text-white", isFarmer ? "w-8 h-8" : "w-7 h-7")} />
                      </div>
                      <div className="space-y-1">
                        <h3 className={cn("font-bold", role.textColor, isFarmer ? "text-3xl" : "text-2xl")}>
                          {role.title}
                        </h3>
                        <p className={cn("font-medium text-sm bg-clip-text text-transparent", `bg-gradient-to-r ${role.gradient}`)}>
                          {role.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 flex-grow">
                      <p className="text-gray-700 text-sm mb-3">{role.description}</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {role.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className={cn("w-7 h-7 rounded-xl mx-auto mb-1 flex items-center justify-center", role.bgPattern)}>
                              <i className={cn(stat.icon, role.textColor)}></i>
                            </div>
                            <div className={cn("text-sm font-bold", role.textColor)}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-600 leading-tight">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2 mb-4">
                        {role.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", `bg-gradient-to-r ${role.gradient}`)}></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <NioButton
                        onClick={() => handleRoleClick(role.id)}
                        className={cn("w-100", `bg-gradient-to-r ${role.gradient} text-white`)}
                        label={
                          <span className="flex items-center justify-center gap-2">
                            Rejoindre maintenant
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        }
                      />
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <div className="mt-5 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <i className="ni ni-users"></i>
              <span>+10,000 utilisateurs actifs</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ni ni-trending-up"></i>
              <span>+25% de productivité moyenne</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ni ni-clock"></i>
              <span>Disponible 24h/7j</span>
            </div>
          </div>
        </div>
      </NioSection.Content>
      <style jsx>{`
        .role-card {
          transition: all 0.3s ease;
        }
        .role-card:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .floating-design {
          animation: float 3s ease-in-out infinite;
        }
        .float-delay-0 {
          animation-delay: 0s;
        }
        .float-delay-1 {
          animation-delay: 0.2s;
        }
        .float-delay-2 {
          animation-delay: 0.4s;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0);
          }
        }
        /* Reflective Effect for Agriculteur */
        .reflect-farmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(16, 185, 129, 0.2),
            transparent
          );
          animation: shine 4s ease-in-out infinite;
          z-index: 2;
        }
        /* Reflective Effect for Transporteur */
        .reflect-transporter::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(244, 63, 94, 0.2),
            transparent
          );
          animation: shine 4s ease-in-out infinite 0.2s;
          z-index: 2;
        }
        /* Reflective Effect for Distributeur */
        .reflect-distributor::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.2),
            transparent
          );
          animation: shine 4s ease-in-out infinite 0.4s;
          z-index: 2;
        }
        @keyframes shine {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
        @media (max-width: 991px) {
          .role-card {
            margin-bottom: 1rem;
            width: 100%;
          }
          .floating-design {
            animation: none; /* Disable floating on smaller screens */
          }
          .reflect-farmer::before,
          .reflect-transporter::before,
          .reflect-distributor::before {
            animation: none; /* Disable reflection on smaller screens */
          }
        }
      `}</style>
    </NioSection>
  );
};

export default NioSectionSignUp;
