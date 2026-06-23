import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:printing/printing.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const MariaPortfolioApp());
}

class MariaPortfolioApp extends StatelessWidget {
  const MariaPortfolioApp({super.key});

  static const Color pastelPink = Color(0xFFFFB5C0);
  static const Color softBackground = Color(0xFFFFFDF6);
  static const Color roseText = Color(0xFF6B3E46);
  static const Color mint = Color(0xFFCDEFE3);

  @override
  Widget build(BuildContext context) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: pastelPink,
      brightness: Brightness.light,
      primary: pastelPink,
      secondary: mint,
      surface: Colors.white,
      onPrimary: roseText,
      onSecondary: roseText,
      onSurface: roseText,
    );

    return MaterialApp(
      title: 'Maria Belen Portfolio',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: colorScheme,
        scaffoldBackgroundColor: softBackground,
        appBarTheme: const AppBarTheme(
          backgroundColor: softBackground,
          foregroundColor: roseText,
          centerTitle: true,
          elevation: 0,
        ),
        cardTheme: CardThemeData(
          color: Colors.white,
          elevation: 0,
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
            side: BorderSide(color: pastelPink.withValues(alpha: 0.45)),
          ),
        ),
        chipTheme: ChipThemeData(
          backgroundColor: Colors.white,
          selectedColor: pastelPink.withValues(alpha: 0.45),
          side: BorderSide(color: pastelPink.withValues(alpha: 0.5)),
          labelStyle: const TextStyle(color: roseText),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
        filledButtonTheme: FilledButtonThemeData(
          style: FilledButton.styleFrom(
            backgroundColor: pastelPink,
            foregroundColor: roseText,
            textStyle: const TextStyle(fontWeight: FontWeight.w700),
            padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 16),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          ),
        ),
        navigationBarTheme: NavigationBarThemeData(
          backgroundColor: Colors.white,
          indicatorColor: pastelPink.withValues(alpha: 0.45),
          labelTextStyle: WidgetStateProperty.all(
            const TextStyle(fontWeight: FontWeight.w600, color: roseText),
          ),
        ),
      ),
      home: const PortfolioShell(),
    );
  }
}

class PortfolioShell extends StatefulWidget {
  const PortfolioShell({super.key});

  @override
  State<PortfolioShell> createState() => _PortfolioShellState();
}

class _PortfolioShellState extends State<PortfolioShell> {
  int _selectedIndex = 0;

  final List<Widget> _pages = const [
    HomeScreen(),
    AboutScreen(),
    ProjectsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Portafolio')),
      body: SafeArea(
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 250),
          child: _pages[_selectedIndex],
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() => _selectedIndex = index);
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Inicio',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: 'Sobre Mí',
          ),
          NavigationDestination(
            icon: Icon(Icons.work_outline),
            selectedIcon: Icon(Icons.work),
            label: 'Proyectos',
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static const String githubUrl = 'https://github.com/MaBelenBecerra';
  static const String linkedInUrl = 'https://www.linkedin.com/';

  Future<void> _openCvPreview(BuildContext context) async {
    try {
      final cvBytes = await rootBundle.load('assets/maria_becerra_cvSpanish.pdf');

      await Printing.layoutPdf(
        name: 'maria_becerra_cvSpanish.pdf',
        onLayout: (_) async => cvBytes.buffer.asUint8List(),
      );
    } catch (error) {
      if (!context.mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('No se pudo abrir el CV: $error'),
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  Future<void> _openUrl(String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      throw Exception('No se pudo abrir $url');
    }
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 760),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 16),
              Text(
                'Hola, bienvenida/o a mi portafolio',
                style: textTheme.titleLarge?.copyWith(
                  color: MariaPortfolioApp.roseText,
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 18),
              Text(
                'Maria Belen Becerra Rivera',
                style: textTheme.displaySmall?.copyWith(
                  color: MariaPortfolioApp.roseText,
                  fontWeight: FontWeight.w800,
                  height: 1.05,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),
              Text(
                'Estudiante de Ingeniería de Software | Enfoque en Project Management',
                style: textTheme.titleMedium?.copyWith(
                  color: MariaPortfolioApp.roseText.withValues(alpha: 0.78),
                  height: 1.35,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 28),
              FilledButton.icon(
                onPressed: () => _openCvPreview(context),
                icon: const Icon(Icons.picture_as_pdf_outlined),
                label: const Text('Ver / Descargar CV'),
              ),
              const SizedBox(height: 28),
              Wrap(
                alignment: WrapAlignment.center,
                spacing: 12,
                runSpacing: 12,
                children: [
                  OutlinedButton.icon(
                    onPressed: () => _openUrl(githubUrl),
                    icon: const Icon(Icons.code),
                    label: const Text('GitHub'),
                  ),
                  OutlinedButton.icon(
                    onPressed: () => _openUrl(linkedInUrl),
                    icon: const Icon(Icons.business_center_outlined),
                    label: const Text('LinkedIn'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  static const List<String> technicalSkills = [
    'Flutter',
    'Dart',
    'JavaScript/TypeScript',
    'React.js',
    'C#',
    'C++',
    'SQL Server',
    'MongoDB',
    'Git/GitHub',
    'Docker',
  ];

  static const List<String> softSkills = [
    'Liderazgo',
    'Trabajo en equipo',
    'Comunicación asertiva',
    'Resolución de problemas',
  ];

  static const List<String> hobbies = [
    'Pole Dance',
    'Lectura online (Ao3)',
    'Videojuegos',
    'K-pop (BTS)',
  ];

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 860),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SectionCard(
                title: 'Sobre Mí',
                child: Text(
                  'Estudiante de 7mo semestre con capacidad comprobada para la resolución de conflictos, coordinación de equipos de trabajo y gestión de recursos en entornos multidisciplinarios.',
                  style: TextStyle(height: 1.45),
                ),
              ),
              const SizedBox(height: 16),
              const SectionCard(
                title: 'Educación',
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    InfoRow(
                      icon: Icons.school_outlined,
                      title: 'Universidad Católica Boliviana "San Pablo"',
                      subtitle: '2023 - Actualidad',
                    ),
                    SizedBox(height: 12),
                    InfoRow(
                      icon: Icons.menu_book_outlined,
                      title: 'Colegio Alemán',
                      subtitle: '2009 - 2022',
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              SkillSection(title: 'Habilidades Técnicas', items: technicalSkills),
              const SizedBox(height: 16),
              SkillSection(title: 'Habilidades Blandas', items: softSkills),
              const SizedBox(height: 16),
              SkillSection(title: 'Hobbies e Intereses', items: hobbies),
            ],
          ),
        ),
      ),
    );
  }
}

class ProjectsScreen extends StatelessWidget {
  const ProjectsScreen({super.key});

  static const List<Project> projects = [
    Project(
      title: 'OrderNow',
      description:
          'Product Owner y Frontend Developer. Plataforma de marketplace delivery en tiempo real.',
      icon: Icons.delivery_dining_outlined,
    ),
    Project(
      title: 'MediTrack',
      description:
          'App Android con dashboard interactivo para gestión de salud.',
      icon: Icons.health_and_safety_outlined,
    ),
    Project(
      title: 'Visualizador de Asteroides',
      description:
          'Exploración interactiva de datos espaciales inspirada en El Principito.',
      icon: Icons.public_outlined,
    ),
    Project(
      title: "Generador de Árboles Genealógicos 'Macumba'",
      description: 'Herramienta para mapear relaciones complejas.',
      icon: Icons.account_tree_outlined,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth >= 720;

        return GridView.builder(
          padding: const EdgeInsets.all(20),
          itemCount: projects.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: isWide ? 2 : 1,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            mainAxisExtent: 170,
          ),
          itemBuilder: (context, index) => ProjectCard(project: projects[index]),
        );
      },
    );
  }
}

class SectionCard extends StatelessWidget {
  const SectionCard({
    required this.title,
    required this.child,
    super.key,
  });

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: MariaPortfolioApp.roseText,
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 12),
            child,
          ],
        ),
      ),
    );
  }
}

class SkillSection extends StatelessWidget {
  const SkillSection({
    required this.title,
    required this.items,
    super.key,
  });

  final String title;
  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return SectionCard(
      title: title,
      child: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: items.map((item) => Chip(label: Text(item))).toList(),
      ),
    );
  }
}

class InfoRow extends StatelessWidget {
  const InfoRow({
    required this.icon,
    required this.title,
    required this.subtitle,
    super.key,
  });

  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: MariaPortfolioApp.roseText),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
              const SizedBox(height: 4),
              Text(subtitle),
            ],
          ),
        ),
      ],
    );
  }
}

class ProjectCard extends StatelessWidget {
  const ProjectCard({required this.project, super.key});

  final Project project;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              backgroundColor:
                  MariaPortfolioApp.pastelPink.withValues(alpha: 0.45),
              foregroundColor: MariaPortfolioApp.roseText,
              child: Icon(project.icon),
            ),
            const SizedBox(height: 14),
            Text(
              project.title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: MariaPortfolioApp.roseText,
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 8),
            Text(project.description, style: const TextStyle(height: 1.35)),
          ],
        ),
      ),
    );
  }
}

class Project {
  const Project({
    required this.title,
    required this.description,
    required this.icon,
  });

  final String title;
  final String description;
  final IconData icon;
}
