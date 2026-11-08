export interface Insight {slug:string;category:string;source:string|null;title:{de:string;en:string};subtitle:{de:string;en:string};paragraphs:{de:string[];en:string[]};readTime:string;number:string;}
export const insights:Insight[] = [
  {
    "slug": "adrs-contracts",
    "category": "PLATFORM ENGINEERING",
    "source": "https://openkubes.org/",
    "title": {
      "en": "Why We Engineer with ADRs & Contracts",
      "de": "Warum wir mit ADRs und Contracts entwickeln"
    },
    "subtitle": {
      "en": "Decisions first. Tools second.",
      "de": "Entscheidungen zuerst. Tools danach."
    },
    "paragraphs": {
      "en": [
        "A platform is not just a cluster. It is a set of promises about how applications are deployed, secured and operated.",
        "Architecture Decision Records (ADRs) record why a choice was made, its trade-offs and who can revisit it. Contracts define what the platform must guarantee to its consumers.",
        "Together, they keep engineering honest: components can change while expectations remain explicit. This matters for long-lived infrastructure, where teams, vendors and technologies inevitably evolve.",
        "We use this mindset to make platform changes reviewable, testable and understandable beyond the team that originally built them."
      ],
      "de": [
        "Eine Plattform ist mehr als ein Cluster. Sie enthält Zusagen darüber, wie Anwendungen bereitgestellt, geschützt und betrieben werden.",
        "Architecture Decision Records (ADRs) halten fest, warum eine Entscheidung getroffen wurde, welche Alternativen es gab und unter welchen Bedingungen sie neu bewertet werden muss. Contracts beschreiben überprüfbare Erwartungen an eine Plattform.",
        "Gemeinsam schaffen sie Stabilität ohne technologische Starre: Komponenten dürfen ausgetauscht werden, solange die vereinbarten Eigenschaften eingehalten werden.",
        "So werden Änderungen überprüfbar, Teams handlungsfähig und Plattformen langfristig wartbar."
      ]
    },
    "readTime": "3 min",
    "number": "01"
  },
  {
    "slug": "central-mcp",
    "category": "AGENTIC AI ARCHITECTURE",
    "source": null,
    "title": {
      "en": "Central MCP: Governed Tool Access for AI Agents",
      "de": "Central MCP: Kontrollierter Tool-Zugriff für KI-Agenten"
    },
    "subtitle": {
      "en": "Connecting agents without losing control.",
      "de": "Agenten vernetzen, ohne Kontrolle zu verlieren."
    },
    "paragraphs": {
      "en": [
        "An AI agent becomes useful when it can work with tools and enterprise data. Every connection, however, is also a new permission boundary.",
        "Our Central MCP (CMCP) concept explores a governed way to expose tools to agents: clear identities, narrowly scoped capabilities, policies and traceable calls.",
        "Instead of granting an agent broad access to production systems, a central layer can mediate what it may discover and invoke. Sensitive actions should require additional checks or human approval.",
        "CMCP is an architectural direction we are exploring, not a claim that a finished gateway is already available."
      ],
      "de": [
        "Ein KI-Agent wird erst dann richtig nützlich, wenn er Werkzeuge und Unternehmensdaten nutzen kann. Jede Verbindung erzeugt aber auch eine neue Berechtigungsgrenze.",
        "Unser Central-MCP-Konzept (CMCP) untersucht einen kontrollierten Zugang zu Werkzeugen: mit Identitäten, begrenzten Fähigkeiten, Richtlinien und nachvollziehbaren Aufrufen.",
        "Statt Agenten umfassenden Zugriff auf Produktionssysteme zu geben, kann eine zentrale Schicht die verfügbaren Funktionen gezielt freigeben. Kritische Aktionen benötigen zusätzliche Prüfungen oder menschliche Zustimmung.",
        "CMCP ist ein Architekturvorhaben und wird hier bewusst nicht als bereits fertig verfügbares Produkt dargestellt."
      ]
    },
    "readTime": "3 min",
    "number": "02"
  },
  {
    "slug": "immortal-platform",
    "category": "RESILIENCE",
    "source": "https://openkubes.org/openkubes-self-healing-blog-post/",
    "title": {
      "en": "The Immortal Platform: Designed to Recover",
      "de": "Die Immortal Platform: Für Wiederherstellung entworfen"
    },
    "subtitle": {
      "en": "Resilience is a design choice.",
      "de": "Resilienz ist eine Architekturentscheidung."
    },
    "paragraphs": {
      "en": [
        "What happens when a cluster fails? The most important question is not how many servers remain, but whether the platform's intended state can be reconstructed.",
        "The Immortal Platform is our architectural vision of infrastructure that can be recreated from declared intent, versioned configuration and trusted operational evidence.",
        "GitOps can restore desired application state; lifecycle automation can recreate infrastructure; contracts define what 'recovered' actually means. The hard part is connecting these capabilities into a coherent recovery path.",
        "Self-healing should be treated as a tested capability with documented limits — never as a promise that failures disappear."
      ],
      "de": [
        "Was passiert, wenn ein Cluster ausfällt? Entscheidend ist nicht nur die Zahl verbleibender Server, sondern ob sich der gewünschte Zustand zuverlässig wiederherstellen lässt.",
        "Die Immortal Platform ist unsere Architekturvision einer Infrastruktur, die sich aus deklarierter Absicht, versionierten Konfigurationen und überprüfbaren Betriebsdaten neu aufbauen lässt.",
        "GitOps kann Anwendungszustände wiederherstellen, Lifecycle-Automatisierung Infrastruktur rekonstruieren und Contracts definieren, wann ein System tatsächlich wiederhergestellt ist.",
        "Self-Healing muss getestet und in seinen Grenzen dokumentiert werden – nicht als Versprechen einer fehlerfreien Infrastruktur."
      ]
    },
    "readTime": "3 min",
    "number": "03"
  },
  {
    "slug": "ai-thinks-evidence-proves",
    "category": "TRUSTWORTHY AGENTIC OPERATIONS",
    "source": "https://openkubes.org/agentic-operations-reference-architecture/",
    "title": {
      "en": "AI Thinks. OpenKubes Executes. Evidence Proves.",
      "de": "KI denkt. OpenKubes führt aus. Evidenz beweist."
    },
    "subtitle": {
      "en": "An intelligent suggestion is not authorization.",
      "de": "Ein intelligenter Vorschlag ist keine Freigabe."
    },
    "paragraphs": {
      "en": [
        "AI can suggest a remediation after correlating logs, alerts and system state. But a convincing explanation is not sufficient authority to change production.",
        "Our reference architecture separates reasoning from execution. An agent formulates a proposal; platform policies and responsible people decide whether it is permitted.",
        "The execution system performs only the approved, bounded operation. Independent evidence then verifies whether the outcome matches the expected state.",
        "This separation creates a stronger foundation for auditable agentic operations than simply allowing a model to call administrative tools."
      ],
      "de": [
        "KI kann aus Logs, Alarmen und Systemzuständen eine mögliche Fehlerbehebung ableiten. Eine überzeugende Erklärung ist jedoch noch keine Berechtigung, Produktionssysteme zu verändern.",
        "Unsere Referenzarchitektur trennt deshalb Analyse und Ausführung. Ein Agent macht einen Vorschlag; Policies und verantwortliche Menschen entscheiden über dessen Zulässigkeit.",
        "Das Ausführungssystem setzt nur die genehmigte, klar begrenzte Aktion um. Unabhängige Evidenz prüft anschließend, ob das erwartete Ergebnis erreicht wurde.",
        "Diese Trennung ist eine bessere Grundlage für auditierbare Agentic Operations als ein Modell mit unbeschränktem Administrationszugriff."
      ]
    },
    "readTime": "3 min",
    "number": "04"
  },
  {
    "slug": "beyond-chatbots",
    "category": "ENTERPRISE AI",
    "source": "https://kubernauts.de/de/services/enterprise-ai-engineering/",
    "title": {
      "en": "Beyond Chatbots: Agentic AI in Enterprise Workflows",
      "de": "Mehr als Chatbots: Agentic AI für Geschäftsprozesse"
    },
    "subtitle": {
      "en": "From answering questions to completing workflows.",
      "de": "Vom Antworten zum kontrollierten Workflow."
    },
    "paragraphs": {
      "en": [
        "A chatbot answers a question. An enterprise workflow often needs to read a case, retrieve information from several systems, prepare a decision, and update the right record.",
        "Agentic AI can coordinate these steps, call approved tools and hand off work to employees when confidence or authority is insufficient.",
        "The real challenge is integration: ERP, CRM, document stores, access controls, exception handling and measurable service levels all need to work together.",
        "We recommend beginning with one bounded use case, measuring cycle time and quality before and after, and scaling only when the evidence supports it."
      ],
      "de": [
        "Ein Chatbot beantwortet Fragen. Ein Geschäftsprozess muss oft zusätzlich einen Vorgang lesen, Daten aus mehreren Systemen zusammenführen, Entscheidungen vorbereiten und einen Datensatz aktualisieren.",
        "Agentic AI kann diese Schritte koordinieren, freigegebene Werkzeuge nutzen und bei Unsicherheit oder fehlenden Rechten an Mitarbeitende übergeben.",
        "Die Herausforderung liegt in der Integration: ERP, CRM, Dokumentenablagen, Zugriffsrechte, Ausnahmebehandlung und messbare Servicequalität müssen zusammenspielen.",
        "Wir empfehlen, mit einem begrenzten Anwendungsfall zu starten, Durchlaufzeit und Qualität zu messen und erst bei nachgewiesenem Nutzen zu skalieren."
      ]
    },
    "readTime": "3 min",
    "number": "05"
  },
  {
    "slug": "meet-oki",
    "category": "OPENKUBES ECOSYSTEM",
    "source": "https://oki.openkubes.org/#start",
    "title": {
      "en": "Meet Oki: A Door into the OpenKubes Ecosystem",
      "de": "Meet Oki: Ein Zugang zum OpenKubes-Ökosystem"
    },
    "subtitle": {
      "en": "Explore, question, understand.",
      "de": "Entdecken, fragen, verstehen."
    },
    "paragraphs": {
      "en": [
        "Open platforms can be powerful and still hard to approach. Documentation, architecture choices and vocabulary may overwhelm newcomers.",
        "Oki is part of our OpenKubes ecosystem. The dedicated Oki experience is the best starting point to discover its current role and explore it directly.",
        "For us, approachable interfaces are a complement to reproducible architecture, not a substitute for source code, ADRs or evidence.",
        "Visit Oki to see the current experience; capabilities may evolve as the project develops."
      ],
      "de": [
        "Offene Plattformen können leistungsfähig und trotzdem schwer zugänglich sein. Dokumentation, Architekturentscheidungen und Fachbegriffe sind für neue Nutzer oft eine Hürde.",
        "Oki gehört zu unserem OpenKubes-Ökosystem. Die eigene Oki-Seite ist der beste Einstieg, um seine aktuelle Rolle kennenzulernen und Oki direkt auszuprobieren.",
        "Verständliche Zugänge ergänzen für uns reproduzierbare Architektur – sie ersetzen weder Quellcode noch ADRs oder überprüfbare Evidenz.",
        "Besuche Oki für den aktuellen Stand. Konkrete Fähigkeiten können sich mit der Weiterentwicklung verändern."
      ]
    },
    "readTime": "3 min",
    "number": "06"
  },
  {
    "slug": "meet-aia",
    "category": "OPENKUBES ECOSYSTEM",
    "source": "https://aia.openkubes.org/en#start",
    "title": {
      "en": "Meet Aia: Exploring Human-Centered AI",
      "de": "Meet Aia: KI mit menschlicher Kontrolle entdecken"
    },
    "subtitle": {
      "en": "An approachable view of our AI journey.",
      "de": "Ein verständlicher Blick auf unsere KI-Reise."
    },
    "paragraphs": {
      "en": [
        "Agentic AI raises an essential question: how should people work with increasingly capable systems without surrendering accountability?",
        "Aia is another experience in the OpenKubes ecosystem. Its dedicated site is the authoritative place to explore what is currently available.",
        "Our broader design principle remains consistent: AI can help analyze and propose, while explicit constraints, review and human responsibility govern consequential actions.",
        "Meet Aia and follow how our approach evolves. We deliberately separate today's visible experience from ideas for future agent integrations."
      ],
      "de": [
        "Agentic AI stellt eine wichtige Frage: Wie können Menschen mit leistungsfähigeren Systemen arbeiten, ohne Verantwortung und Kontrolle abzugeben?",
        "Aia ist ein weiterer Zugang im OpenKubes-Ökosystem. Die eigene Website zeigt am zuverlässigsten, was aktuell verfügbar ist.",
        "Unser Architekturprinzip bleibt dabei konstant: KI darf analysieren und Vorschläge machen; Grenzen, Überprüfung und menschliche Verantwortung steuern folgenreiche Aktionen.",
        "Lerne Aia kennen und verfolge die Entwicklung. Wir trennen bewusst die heute sichtbare Erfahrung von möglichen zukünftigen Agentenintegrationen."
      ]
    },
    "readTime": "3 min",
    "number": "07"
  }
];
export const insightBySlug=(slug:string)=>insights.find(i=>i.slug===slug);
