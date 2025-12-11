import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { items } = await BaseCrudService.getAll<Projects>('projects');
      setProjects(items);
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-secondary" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-gradientlightblue to-white py-20 lg:py-32">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary mb-6">
              أعمالنا
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-secondaryForeground leading-relaxed">
              نماذج من مشاريعنا المنفذة بنجاح في مختلف أنحاء العراق
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full bg-white py-20 lg:py-28">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondaryForeground">
                لا توجد مشاريع متاحة حالياً
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video relative overflow-hidden bg-gradientlightblue">
                    {project.mainImage ? (
                      <Image
                        src={project.mainImage}
                        alt={project.projectName || 'مشروع'}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        width={600}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-paragraph text-secondaryForeground/50">
                          لا توجد صورة
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                      {project.projectName || 'مشروع بدون عنوان'}
                    </h3>
                    <p className="font-paragraph text-sm text-secondaryForeground mb-4 line-clamp-3 leading-relaxed">
                      {project.description || 'لا يوجد وصف متاح'}
                    </p>
                    <div className="flex flex-col gap-2">
                      {project.location && (
                        <div className="flex items-center gap-2 font-paragraph text-sm text-secondaryForeground/70">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                      )}
                      {project.completionDate && (
                        <div className="flex items-center gap-2 font-paragraph text-sm text-secondaryForeground/70">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.completionDate).toLocaleDateString('ar-IQ', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </div>
                      )}
                      {project.clientName && (
                        <div className="font-paragraph text-sm text-secondaryForeground/70">
                          العميل: {project.clientName}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 left-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                aria-label="إغلاق"
              >
                <span className="text-2xl text-primary">×</span>
              </button>

              {/* Main Image */}
              {selectedProject.mainImage && (
                <div className="aspect-video relative overflow-hidden bg-gradientlightblue rounded-t-2xl">
                  <Image
                    src={selectedProject.mainImage}
                    alt={selectedProject.projectName || 'مشروع'}
                    className="w-full h-full object-cover"
                    width={1200}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-8 lg:p-12">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
                  {selectedProject.projectName || 'مشروع بدون عنوان'}
                </h2>

                <div className="flex flex-wrap gap-4 mb-6">
                  {selectedProject.location && (
                    <div className="flex items-center gap-2 font-paragraph text-base text-secondaryForeground/70">
                      <MapPin className="w-5 h-5" />
                      {selectedProject.location}
                    </div>
                  )}
                  {selectedProject.completionDate && (
                    <div className="flex items-center gap-2 font-paragraph text-base text-secondaryForeground/70">
                      <Calendar className="w-5 h-5" />
                      {new Date(selectedProject.completionDate).toLocaleDateString('ar-IQ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  )}
                </div>

                {selectedProject.clientName && (
                  <div className="mb-6">
                    <span className="font-heading text-lg font-semibold text-primary">
                      العميل:{' '}
                    </span>
                    <span className="font-paragraph text-lg text-secondaryForeground">
                      {selectedProject.clientName}
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                    وصف المشروع
                  </h3>
                  <p className="font-paragraph text-base text-secondaryForeground leading-relaxed whitespace-pre-line">
                    {selectedProject.description || 'لا يوجد وصف متاح'}
                  </p>
                </div>

                {/* Secondary Image */}
                {selectedProject.secondaryImage && (
                  <div className="mb-8">
                    <h3 className="font-heading text-xl font-semibold text-primary mb-4">
                      صور إضافية
                    </h3>
                    <div className="aspect-video relative overflow-hidden bg-gradientlightblue rounded-2xl">
                      <Image
                        src={selectedProject.secondaryImage}
                        alt={`${selectedProject.projectName} - صورة إضافية`}
                        className="w-full h-full object-cover"
                        width={1200}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
