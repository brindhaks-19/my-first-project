import { Project, SkillCategory, Methodology, ExperienceItem, BenchmarkModel } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Brindha K.',
  role: 'Senior Systems Engineer & Software Architect',
  headline: 'Architecting ultra-low latency distributed engines, mission-critical Java systems, and resilient cloud architectures.',
  bio: 'Specializing in concurrent systems engineering, JVM internals, quantitative performance modeling, and distributed consensus. Over 8 years of experience designing fault-tolerant backends processing hundreds of thousands of transactions per second with microsecond predictability.',
  email: 'brindhaks1907@gmail.com',
  github: 'https://github.com/brindhaks1907',
  linkedin: 'https://linkedin.com/in/brindha-k-systems',
  location: 'San Francisco, CA (Open to Global / Remote)',
  availability: 'Available for Principal Roles & Technical Advisory',
  metrics: [
    { value: '450k+', label: 'Peak Ingestion QPS Handled' },
    { value: '< 1.8ms', label: 'p99 End-to-End Latency Target' },
    { value: '99.999%', label: 'Multi-Region Service Availability' },
    { value: '8+ Years', label: 'Enterprise Systems Engineering' },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Java & JVM Internals',
    subtitle: 'High-throughput concurrency, memory profiling, and mechanical sympathy',
    iconName: 'Cpu',
    skills: [
      { name: 'Java 17/21 & Loom', proficiency: 96, context: 'Virtual Threads, Structured Concurrency, Scoped Values' },
      { name: 'JMM & Lock-Free Data Structures', proficiency: 94, context: 'Atomic VarHandles, Disruptor RingBuffers, CAS algorithms' },
      { name: 'Garbage Collection Tuning', proficiency: 92, context: 'ZGC, Shenandoah, G1 ergonomics, GC-pause mitigation' },
      { name: 'JIT Bytecode & Flame Graphs', proficiency: 88, context: 'Async-profiler, JMH microbenchmarks, C2 compiler escape analysis' },
    ],
    highlights: [
      'Eliminated 98% of stop-the-world GC pauses transitioning latency-critical services to Generational ZGC.',
      'Authored zero-allocation deserialization parsers achieving 4x throughput improvements.',
      'Extensive experience with Netty, Aeron UDP, gRPC, and byte buffer pooling.',
    ],
  },
  {
    title: 'Distributed Systems Architecture',
    subtitle: 'Consensus protocols, high availability, and horizontal scaling',
    iconName: 'Network',
    skills: [
      { name: 'Distributed Consensus', proficiency: 92, context: 'Raft, Multi-Paxos, Vector Clocks, Split-brain mitigation' },
      { name: 'Event Streaming & Messaging', proficiency: 95, context: 'Apache Kafka, Pulsar, Exactly-Once Semantics (EOS)' },
      { name: 'Data Partitioning & Caching', proficiency: 93, context: 'Consistent Hashing, Redis Cluster, Two-tier Cache Coherency' },
      { name: 'Fault Tolerance & Resilience', proficiency: 95, context: 'Circuit breakers, Bulkheading, Rate limiting (Token Bucket/Leaky)' },
    ],
    highlights: [
      'Engineered an active-active dual-region replication topology with bounded staleness guarantees.',
      'Designed event-driven idempotency layers protecting against out-of-order message delivery.',
      'Implemented distributed leasing algorithms ensuring mutual exclusion without single points of failure.',
    ],
  },
  {
    title: 'Quantitative Aptitude & Algorithmic Design',
    subtitle: 'Mathematical modeling, computational complexity, and optimization',
    iconName: 'TrendingUp',
    skills: [
      { name: 'Algorithmic Complexity & Optimization', proficiency: 95, context: 'Amortized time/space analysis, cache-friendly data layouts' },
      { name: 'Probabilistic Data Structures', proficiency: 90, context: 'HyperLogLog, Count-Min Sketch, Scalable Bloom Filters' },
      { name: 'Graph Algorithms & Partitioning', proficiency: 91, context: 'Topological sorting, Dijkstra, Minimum Spanning Trees, Louvain' },
      { name: 'Numerical Simulation & Statistics', proficiency: 89, context: 'Monte Carlo simulations, percentile estimation (T-Digest)' },
    ],
    highlights: [
      'Constructed streaming percentile estimators using T-Digest reducing memory footprints from 120MB to 45KB.',
      'Built financial order-book matching engines running in O(1) amortized limit-order insertion.',
      'Authored automated capacity forecasting models utilizing polynomial regression and time-series decomposition.',
    ],
  },
  {
    title: 'Cloud Native & Storage Engines',
    subtitle: 'Scalable infrastructure, LSM-trees, and observability',
    iconName: 'Server',
    skills: [
      { name: 'Storage Architecture', proficiency: 91, context: 'LSM-Trees, B+ Trees, Write-Ahead Logs (WAL), SSTables' },
      { name: 'Kubernetes & Service Mesh', proficiency: 90, context: 'Istio, eBPF telemetry, custom operators, pod autoscaling' },
      { name: 'Observability & APM', proficiency: 94, context: 'OpenTelemetry, Prometheus, Grafana, Distributed Tracing (Jaeger)' },
      { name: 'Firebase & Cloud Platforms', proficiency: 92, context: 'Firebase Hosting, GCP Cloud Run, Firestore indexing, IAM hardening' },
    ],
    highlights: [
      'Architected custom LSM storage layer with bloom-filter bypass, accelerating point lookups by 3.2x.',
      'Full CI/CD pipelines deploying immutable artifacts with automated rollback verification.',
      'Complete production telemetry infrastructure monitoring tail latencies down to single-digit milliseconds.',
    ],
  },
];

export const METHODOLOGIES: Methodology[] = [
  {
    number: '01',
    title: 'First-Principles Architectural Deconstruction',
    description: 'Every system begins by isolating irreducible physical constraints: memory bus saturation, network packet round-trip limits, and disk I/O barriers before picking technologies.',
    deliverables: ['System boundary definitions', 'Network & memory budget specifications', 'Mathematical capacity ceilings'],
  },
  {
    number: '02',
    title: 'Formal Invariant Modeling & Proofs',
    description: 'Ensuring state machines and distributed transitions preserve linearizability and consistency invariants through formal state-space verification.',
    deliverables: ['State transition statecharts', 'Consensus failure matrix analysis', 'Idempotency verification protocols'],
  },
  {
    number: '03',
    title: 'Empirical Profiling & Microbenchmarking',
    description: 'No architectural claim is accepted without statistically valid empirical proof. Employing JMH (Java Microbenchmark Harness) and async-profiler under realistic workload distributions.',
    deliverables: ['JMH benchmark suites', 'Flame graph memory allocations', 'p50/p95/p99/p99.9 latency histograms'],
  },
  {
    number: '04',
    title: 'Chaos Engineering & Automated Verification',
    description: 'Injecting partition network splits, simulated disk stalls, and memory exhaustion in staging to prove zero-downtime self-healing before production release.',
    deliverables: ['Chaos mesh failure test suites', 'Automated failover verifications', 'Zero-downtime deployment pipelines'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'aether-queue',
    title: 'AetherQueue: Low-Latency Distributed Log Engine',
    kicker: 'Distributed Systems & Concurrency',
    tagline: 'High-throughput append-only distributed commit log with sub-2ms p99 write latency.',
    category: 'Distributed Systems',
    technologies: ['Java 21', 'Raft Consensus', 'Aeron UDP', 'RingBuffer', 'Zero-Copy I/O'],
    metrics: [
      { label: 'Throughput', value: '450,000 ops/sec' },
      { label: 'p99 Latency', value: '1.8 ms' },
      { label: 'Replication SLA', value: '99.999%' },
    ],
    overview: 'AetherQueue is a purpose-built distributed message log written in Java 21 designed for financial event distribution. It replaces heavy multi-broker frameworks with a lean, lock-free ring-buffer pipeline coupled with a Raft-based consensus protocol operating over Aeron zero-copy UDP transport.',
    architectureDetails: [
      'Lock-Free Disruptor RingBuffer architecture preventing thread contention across core consumer threads.',
      'Memory-mapped zero-copy WAL (Write-Ahead Log) persistence writing sequential disk blocks with O_DIRECT flags.',
      'Multi-Raft partition groups distributing leader leases uniformly across cluster topologies.',
      'Dynamic flow control backpressure preventing consumer heap memory blowouts under spike traffic.',
    ],
    tradeoffs: 'Optimized for high-throughput sequential writes and low tail latencies over ad-hoc query capabilities. Strict linearizability guarantees enforce CP characteristics over AP partition tolerance.',
    codeSnippet: `// Lock-Free RingBuffer Ingestion Slot Reservation
public final class JournalBuffer {
  private final VarHandle sequenceHandle;
  private final ByteBuffer[] memoryPages;
  private static final int PAGE_MASK = 0xFFFF;

  public long claimAndAppend(final byte[] payload, final int length) {
    long currentSeq;
    long nextSeq;
    do {
      currentSeq = (long) sequenceHandle.getVolatile(this);
      nextSeq = currentSeq + 1;
    } while (!sequenceHandle.compareAndSet(this, currentSeq, nextSeq));

    int slot = (int) (currentSeq & PAGE_MASK);
    memoryPages[slot].clear();
    memoryPages[slot].put(payload, 0, length);
    return currentSeq;
  }
}`,
    githubUrl: 'https://github.com/brindhaks1907/aether-queue',
    liveUrl: 'https://github.com/brindhaks1907/aether-queue#benchmarks',
  },
  {
    id: 'vanguard-engine',
    title: 'Vanguard: Quantitative Order Routing & Risk Engine',
    kicker: 'Quantitative Computing',
    tagline: 'Microsecond limit order-book matching engine with real-time portfolio margin evaluation.',
    category: 'Quantitative Engine',
    technologies: ['Java 21', 'Disruptor', 'Fixed-Point Math', 'Off-Heap Memory', 'JMH'],
    metrics: [
      { label: 'Matching Latency', value: '4.2 µs' },
      { label: 'Orders Handled', value: '2.5M / min' },
      { label: 'Allocation', value: '0 bytes / order' },
    ],
    overview: 'A high-frequency quantitative order matching and pre-trade risk evaluation engine. Employs mechanical sympathy principles: cache-aligned continuous arrays, zero object allocation during the order execution lifecycle, and 64-bit fixed-point arithmetic eliminating IEEE 754 floating-point nondeterminism.',
    architectureDetails: [
      'Pre-allocated off-heap contiguous price level arrays ensuring L1/L2 CPU cache residency during order matches.',
      'Bypasses JVM Garbage Collector entirely on the critical path using sun.misc.Unsafe direct memory pointers.',
      'Vectorized Black-Scholes risk checks using Java 21 Vector API (SIMD) evaluating 16 options contracts simultaneously.',
      'Microsecond timestamp recording via hardware TSC (Time Stamp Counter) instructions.',
    ],
    tradeoffs: 'Sacrifices dynamic abstraction layers in favor of raw L1/L2 cache locality and predictable execution timelines without jitter.',
    codeSnippet: `// SIMD Vectorized Margin Valuation
public static void computePortfolioValuation(
    final FloatVector spotVec, 
    final FloatVector strikeVec, 
    final FloatVector volatilityVec) {
  var d1 = spotVec.div(strikeVec).lanewise(VectorOperators.LOG)
      .add(volatilityVec.mul(volatilityVec).mul(0.5f))
      .div(volatilityVec);
  // Evaluates 8 options contracts per CPU cycle
}`,
    githubUrl: 'https://github.com/brindhaks1907/vanguard-risk-engine',
    liveUrl: 'https://github.com/brindhaks1907/vanguard-risk-engine#architecture',
  },
  {
    id: 'chronos-db',
    title: 'Chronos: Distributed Time-Series Engine',
    kicker: 'Storage & Distributed State',
    tagline: 'LSM-Tree storage engine optimized for telemetry ingest with Gorilla delta-of-delta compression.',
    category: 'High-Throughput Java',
    technologies: ['Java 21', 'LSM-Tree', 'SSTables', 'Gorilla Compression', 'Bloom Filters'],
    metrics: [
      { label: 'Compression Ratio', value: '11.4x' },
      { label: 'Ingest Rate', value: '1.2M points/s' },
      { label: 'Query Response', value: '14 ms p95' },
    ],
    overview: 'Chronos is an embeddable and horizontally clusterable time-series storage engine. Built with tiered MemTables and Leveled Compaction SSTables, Chronos integrates Gorilla timestamp XOR delta compression achieving over 90% space reduction on high-cardinality telemetry data.',
    architectureDetails: [
      'Concurrent SkipList MemTable flushing asynchronously to immutably sorted SSTable disk structures.',
      'Fast-path bloom filter evaluations bypassing 99.4% of unnecessary disk seeks on point queries.',
      'Leveled Compaction strategy maintaining bounded write amplification and steady disk write bandwidth.',
      'Zero-copy block cache utilizing direct memory with LRU eviction and tiered hit metrics.',
    ],
    tradeoffs: 'Favors write performance and compression ratios over random updates. Data is immutable once appended.',
    githubUrl: 'https://github.com/brindhaks1907/chronos-tsdb',
    liveUrl: 'https://github.com/brindhaks1907/chronos-tsdb#benchmarks',
  },
  {
    id: 'nexus-mesh',
    title: 'NexusMesh: Resilient Cloud Service Fabric',
    kicker: 'Cloud Infrastructure & Networking',
    tagline: 'Sidecar-less service mesh proxy orchestrating adaptive load balancing and distributed tracing.',
    category: 'Cloud Infrastructure',
    technologies: ['Java', 'eBPF', 'OpenTelemetry', 'gRPC', 'Envoy Protocol'],
    metrics: [
      { label: 'Proxy Overhead', value: '< 0.3ms' },
      { label: 'Services Managed', value: '250+' },
      { label: 'Failure Recovery', value: '< 200ms' },
    ],
    overview: 'NexusMesh provides zero-trust mTLS, adaptive least-request load balancing, and distributed tracing across microservices. By leveraging kernel-level eBPF socket acceleration, NexusMesh removes sidecar network hop penalties while maintaining fine-grained telemetry.',
    architectureDetails: [
      'Adaptive load-balancing algorithm using EWMA (Exponentially Weighted Moving Average) latency scoring.',
      'Kernel socket redirection via eBPF sockops avoiding loopback TCP handshake latency.',
      'Distributed context propagation injecting W3C trace headers across thread pools and network boundaries.',
      'Automated outlier detection isolating unhealthy pods before client requests experience timeouts.',
    ],
    tradeoffs: 'Requires modern Linux kernels (5.4+) for full eBPF acceleration features, falling back gracefully to user-space proxying.',
    githubUrl: 'https://github.com/brindhaks1907/nexus-mesh',
    liveUrl: 'https://github.com/brindhaks1907/nexus-mesh#docs',
  },
];

export const BENCHMARKS: BenchmarkModel[] = [
  {
    name: 'Concurrent Ingestion Pipeline',
    description: 'Comparing throughput of Java thread-safe queue architectures under 16 concurrent producer threads.',
    metricLabel: 'Throughput (million ops/sec)',
    unit: 'M ops/sec',
    competitors: [
      { name: 'Disruptor RingBuffer (Lock-Free)', value: 18.4, baselineNote: 'Zero locks, cache-line padded sequence', isOptimal: true },
      { name: 'LinkedTransferQueue (CAS)', value: 6.8, baselineNote: 'Non-blocking linked nodes' },
      { name: 'ArrayBlockingQueue (ReentrantLock)', value: 3.2, baselineNote: 'Single lock mutex contention' },
      { name: 'Synchronized LinkedList', value: 0.9, baselineNote: 'Heavy lock convoy & GC churn' },
    ],
    complexity: { time: 'O(1) amortized', space: 'O(N) preallocated' },
    insight: 'RingBuffer with false-sharing padding delivers 5.7x the throughput of ArrayBlockingQueue by eliminating thread parking and L3 cache line invalidations.',
  },
  {
    name: 'Storage Write Amplification',
    description: 'Measuring random write latency on storage architectures under sustained 100,000 write ops/sec.',
    metricLabel: 'Random Write p99 Latency (ms)',
    unit: 'ms',
    competitors: [
      { name: 'LSM-Tree with Leveled Compaction', value: 1.4, baselineNote: 'Sequential append to WAL + Memtable', isOptimal: true },
      { name: 'Fractal Tree (Buffered B-Tree)', value: 3.8, baselineNote: 'Node buffer flushing' },
      { name: 'Traditional B+ Tree (In-place)', value: 19.6, baselineNote: 'Random 4KB page read-modify-write' },
      { name: 'Unindexed Append Log', value: 0.8, baselineNote: 'Fast writes but O(N) scan cost' },
    ],
    complexity: { time: 'O(log_B N) writes', space: 'O(N) with 11x compression' },
    insight: 'LSM architecture converts random writes into sequential disk operations, yielding an order-of-magnitude reduction in tail latency over B+ trees.',
  },
  {
    name: 'Garbage Collection Stop-The-World Pauses',
    description: 'Worst-case stop-the-world pause times under a 32GB JVM heap with 500,000 transient objects/sec.',
    metricLabel: 'Worst STW Pause Time (ms)',
    unit: 'ms',
    competitors: [
      { name: 'Generational ZGC (Java 21)', value: 0.45, baselineNote: 'Colored pointers & concurrent phase', isOptimal: true },
      { name: 'Shenandoah GC', value: 2.1, baselineNote: 'Concurrent compaction with Brooks pointers' },
      { name: 'G1 GC (Tuned -XX:MaxGCPauseMillis=10)', value: 14.8, baselineNote: 'Mixed collections with regional pauses' },
      { name: 'Parallel GC (Default throughput)', value: 240.0, baselineNote: 'Full-heap stop-the-world collection' },
    ],
    complexity: { time: 'Sub-millisecond constant', space: '< 3% memory overhead' },
    insight: 'Generational ZGC decouples pause duration from heap size, keeping p99.9 pauses under 1ms even as allocations spike to 4GB/sec.',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2023 - Present',
    role: 'Principal Systems Architect',
    company: 'Enterprise Distributed Platforms Group',
    location: 'San Francisco, CA',
    summary: 'Directing the core distributed platform architecture supporting real-time transaction processing across multi-region cloud infrastructures.',
    impactMetrics: [
      'Spearheaded migration of legacy core monolith to event-driven Java 21 virtual thread services, cutting compute costs by 42%.',
      'Engineered an active-active cross-region replication layer achieving sub-100ms synchronization across three continents.',
      'Established engineering-wide JMH benchmarking and memory profiling standards, eliminating recurring production latency spikes.',
    ],
    technologies: ['Java 21', 'Apache Kafka', 'Kubernetes', 'gRPC', 'Distributed Tracing', 'GCP'],
  },
  {
    period: '2020 - 2023',
    role: 'Staff Backend & Performance Engineer',
    company: 'Financial Ingestion Systems',
    location: 'New York, NY',
    summary: 'Designed low-latency ingestion engines and real-time algorithmic matching pipelines processing tens of millions of financial records daily.',
    impactMetrics: [
      'Architected lock-free order routing engine reducing order execution p99 latency from 18ms down to 1.8ms.',
      'Developed custom memory-mapped cache replacing external Redis dependency on critical execution paths.',
      'Mentored 14 senior engineers in JVM memory mechanics, concurrency invariants, and distributed debugging.',
    ],
    technologies: ['Java 17', 'Netty', 'Disruptor', 'RocksDB', 'Prometheus', 'Docker'],
  },
  {
    period: '2017 - 2020',
    role: 'Senior Software Engineer (Distributed State)',
    company: 'Cloud Scale Infrastructure Corp',
    location: 'Seattle, WA',
    summary: 'Built fault-tolerant distributed storage systems, consensus algorithms, and multi-tenant telemetry backends.',
    impactMetrics: [
      'Implemented Raft consensus module for metadata management across 1,000+ storage nodes with automated rebalancing.',
      'Engineered time-series compaction pipeline handling 2B+ daily metrics points.',
      'Awarded Best Engineering Innovation Award for zero-downtime database cluster partitioning solution.',
    ],
    technologies: ['Java 11', 'Raft', 'Cassandra', 'Go', 'AWS EC2', 'Linux Kernel I/O'],
  },
];
