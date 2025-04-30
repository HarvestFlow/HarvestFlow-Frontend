import React from "react";
import { useNavigate } from "react-router-dom";
import { useTradeData } from "./TradeDataContext";
import {
  Box, Typography, Stack, Button, CircularProgress,
  Paper, Card,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

const formatAiResponse = (text) => {
  if (!text) return '';
  const lines = text.split('\n').filter(line => line.trim());
  let html = '';
  let inList = false;

  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith('## ')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<h5 class="section-title">${line.slice(3)}</h5>`;
    } else if (line.startsWith('### ')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="section-text">${line.slice(4)}</p>`;
    } else if (line.match(/^\*\*.*\*\*$/)) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      const content = line.replace(/^\*\*(.*)\*\*$/, '$1').trim();
      html += `<p class="section-text">${content}</p>`;
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="metric-list">';
        inList = true;
      }
      let content = line.slice(2).trim();
      html += `<li>${content}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="section-text">${line}</p>`;
    }
  });

  if (inList) {
    html += '</ul>';
  }

  return DOMPurify.sanitize(html, { ADD_ATTR: ['class'] });
};

const TradeAiReportPage = () => {
  const navigate = useNavigate();
  const { aiAnalysis, aiLoading, aiError, tradeData } = useTradeData();

  const sections = aiAnalysis ? aiAnalysis.split('## ').filter(s => s.trim()) : [];

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #B0BEC5 100%)',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' opacity='0.05'%3E%3Cpath d='M10 90 Q 50 10 90 90' stroke='%23A9CBA4' stroke-width='5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.05,
          zIndex: 0,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#355E3B',
          fontWeight: 700,
          fontFamily: '"Playfair Display", serif',
          mb: 4,
          textAlign: 'center',
        }}
      >
        Étape 3 : Rapport Généré par IA
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '2px solid #A9CBA4',
            bgcolor: '#FAFAFA',
            '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.16)' },
            transition: 'box-shadow 0.3s ease',
            position: 'relative',
            zIndex: 1,
            maxWidth: '1000px',
            mx: 'auto',
          }}
        >
          {aiLoading ? (
            <CircularProgress size={24} sx={{ display: 'block', mx: 'auto', color: '#A9CBA4' }} />
          ) : aiError ? (
            <Typography color="error" sx={{ fontStyle: 'italic', fontSize: { xs: '0.875rem', sm: '1rem' }, color: '#4A704C' }}>
              {aiError}
            </Typography>
          ) : aiAnalysis ? (
            <Box>
              {sections.map((section, index) => {
                const [title, ...content] = section.split('\n');
                return (
                  <Accordion
                    key={index}
                    defaultExpanded={index === 0}
                    sx={{
                      mb: 2,
                      borderRadius: '8px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      '&:before': { display: 'none' },
                      bgcolor: '#FAFAFA',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: '#6B9E78' }} />}
                      sx={{
                        bgcolor: '#F7F9F4',
                        borderRadius: '8px',
                        '&:hover': { bgcolor: '#E8F5E9' },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#355E3B',
                          fontWeight: 600,
                          fontFamily: '"Playfair Display", serif',
                          fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        }}
                      >
                        {title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{
                          color: '#4A704C',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          fontFamily: '"Roboto", sans-serif',
                          '& .section-title': {
                            color: '#355E3B',
                            fontWeight: 600,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            mt: 3,
                            mb: 1.5,
                            borderLeft: '4px solid #A9CBA4',
                            pl: 1.5,
                          },
                          '& .section-text': {
                            mb: 1,
                            color: '#4A704C',
                          },
                          '& .metric-list': {
                            pl: 3,
                            mb: 1.5,
                            '& li': {
                              mb: 0.5,
                              position: 'relative',
                              pl: 1.5,
                              '&::before': {
                                content: '"•"',
                                position: 'absolute',
                                left: 0,
                                color: '#A9CBA4',
                                fontWeight: 'bold',
                              },
                            },
                          },
                        }}
                        dangerouslySetInnerHTML={{ __html: formatAiResponse(content.join('\n')) }}
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                    border: '1px solid #A9CBA4',
                    bgcolor: '#FAFAFA',
                    mt: 3,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#355E3B',
                      mb: 2,
                      fontWeight: 500,
                      fontFamily: '"Roboto", sans-serif',
                    }}
                  >
                    Données Brutes (JSON)
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      bgcolor: '#F7F9F4',
                      p: 2,
                      borderRadius: 1,
                      maxHeight: '300px',
                      overflow: 'auto',
                      fontSize: '0.875rem',
                      color: '#4A704C',
                    }}
                  >
                    {JSON.stringify(tradeData, null, 2)}
                  </Box>
                </Paper>
              </motion.div>
              <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard/trade-wizard/chart')}
                  sx={{
                    borderColor: '#A9CBA4',
                    color: '#6B9E78',
                    fontFamily: '"Roboto", sans-serif',
                    '&:hover': { borderColor: '#4A704C', color: '#4A704C' },
                  }}
                >
                  Retour
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/dashboard/trade-wizard')}
                  sx={{
                    bgcolor: '#6B9E78',
                    color: '#E8F5E9',
                    fontFamily: '"Roboto", sans-serif',
                    '&:hover': { bgcolor: '#4A704C' },
                  }}
                >
                  Recommencer
                </Button>
              </Stack>
            </Box>
          ) : (
            <Typography sx={{ color: '#4A704C', fontStyle: 'italic', fontSize: { xs: '0.875rem', sm: '1rem' }, fontFamily: '"Roboto", sans-serif' }}>
              Aucune analyse disponible. Veuillez attendre que les données soient analysées.
            </Typography>
          )}
        </Card>
      </motion.div>
    </Box>
  );
};

export default TradeAiReportPage;