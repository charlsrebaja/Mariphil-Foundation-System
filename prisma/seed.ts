import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mariphilfoundation.org' },
    update: {},
    create: {
      email: 'admin@mariphilfoundation.org',
      name: 'Admin User',
      role: 'admin',
      passwordHash: hashedPassword,
    },
  });

  console.log('Created admin user:', admin);

  // Create sample projects
  const project1 = await prisma.project.upsert({
    where: { slug: 'mariphil-childrens-village' },
    update: {},
    create: {
      title: "MARIPHIL Children's Village",
      slug: 'mariphil-childrens-village',
      summary: "In the MARIPHIL Children's Village, children and young people who have been abandoned by their parents and society are given a loving home and the chance of a self-determined future through education.",
      content: `
# MARIPHIL Children's Village

A safe haven where abandoned children and young people find hope, love, and opportunities for a better future.

## Our Mission

The MARIPHIL Children's Village provides a nurturing home environment for children who have been abandoned by their parents and society. We offer them more than just shelter - we provide a loving family atmosphere where they can heal, grow, and develop into self-sufficient individuals.

## What We Provide

### A Loving Home
- Safe and secure residential facilities
- Family-style living arrangements
- 24/7 care and supervision
- Emotional support and counseling

### Quality Education
- Access to quality schools and educational resources
- Tutoring and academic support
- Vocational training programs
- Scholarship opportunities for higher education

### Holistic Development
- Life skills training
- Character development programs
- Sports and recreational activities
- Cultural and artistic pursuits

### Path to Independence
- Career guidance and counseling
- Job placement assistance
- Financial literacy training
- Continued support during transition to independent living

## Our Impact

Since our establishment, we have provided a home for hundreds of children, helping them overcome adversity and build successful futures. Many of our former residents have gone on to become successful professionals, contributing positively to their communities.

## How You Can Help

Your support enables us to continue providing a loving home and bright future for abandoned children. Every donation helps us maintain our facilities, provide quality education, and offer comprehensive care to children in need.
      `.trim(),
      coverImage: '/images/mariphil-village.jpg',
      status: 'active',
    },
  });

  const project2 = await prisma.project.upsert({
    where: { slug: 'sponsorships' },
    update: {},
    create: {
      title: 'Sponsorships',
      slug: 'sponsorships',
      summary: 'We offer several forms of sponsorship for our supporters. If you would like to support the aid project MARIPHIL Foundation Inc. regularly and over a longer period of time, you can do so through a sponsorship. Through a school sponsorship, you enable a child in need to receive a school education. You can also become a sponsor of a specific project and support it financially.',
      content: `
# Sponsorships

Support children and projects through meaningful, long-term partnerships.

## Making a Lasting Impact

We offer several forms of sponsorship for our supporters who want to make a sustained difference in the lives of children and communities in the Philippines. If you would like to support the aid project MARIPHIL Foundation Inc. regularly and over a longer period of time, a sponsorship is the perfect way to create meaningful change.

## Types of Sponsorships

### School Sponsorship
Through a school sponsorship, you enable a child in need to receive a quality school education. Your regular support covers:

- School tuition and enrollment fees
- School supplies and textbooks
- School uniforms
- Transportation to school
- Educational materials and resources

**Impact:** One school sponsorship can transform a child's entire future, breaking the cycle of poverty through education.

### Project Sponsorship
You can also become a sponsor of a specific project and support it financially. Project sponsorships help fund:

- Infrastructure development
- Educational programs and initiatives
- Healthcare and nutrition programs
- Community development projects
- Vocational training facilities

**Flexibility:** Choose to sponsor a project that aligns with your values and interests.

## Benefits of Sponsorship

### Regular Updates
- Receive quarterly reports on your sponsored child or project
- Annual progress photos and stories
- Direct communication opportunities (for child sponsorships)

### Tax Deductibility
- All sponsorship contributions are tax-deductible
- Annual receipts provided for tax purposes

### Personal Connection
- Build a meaningful relationship with a child or community
- See the direct impact of your generosity
- Participate in the transformation of lives

## How to Become a Sponsor

1. **Choose Your Sponsorship Type** - Select between child/school sponsorship or project sponsorship
2. **Set Your Contribution** - Decide on a monthly amount that works for you
3. **Complete Registration** - Fill out the sponsorship form
4. **Start Making a Difference** - Begin your journey of transformation

## Sponsorship Levels

### Basic School Sponsorship
- Monthly contribution: ₱1,500
- Covers basic educational needs

### Full School Sponsorship
- Monthly contribution: ₱3,000
- Covers complete education including extra-curricular activities

### Project Sponsorship
- Monthly contribution: ₱5,000+
- Supports specific project initiatives

## Long-Term Commitment

Sponsorships work best when maintained over an extended period, allowing for:
- Consistent support throughout a child's education
- Sustainable project development
- Stronger community partnerships
- Lasting positive change

Your commitment helps us plan effectively and ensures the continuity of our programs.

## Join Our Sponsor Community

By becoming a sponsor, you join a compassionate community of supporters who are actively changing lives in the Philippines. Together, we're building a brighter future, one child and one project at a time.
      `.trim(),
      coverImage: '/images/projects/Sponsorships.jpg',
      status: 'active',
    },
  });

  const project3 = await prisma.project.upsert({
    where: { slug: 'health-insurance-emergency-care' },
    update: {},
    create: {
      title: 'Health Insurance and Emergency Care',
      slug: 'health-insurance-emergency-care',
      summary: 'The majority of families in the Philippines have poor access to medical care and have to pay for medication and treatment out of their own pockets. The absolute majority of people do not have social health insurance and cases of illness often end fatally.',
      content: `
# Health Insurance and Emergency Care

Providing critical healthcare access and financial protection for families in need.

## The Healthcare Crisis in the Philippines

The majority of families in the Philippines have poor access to medical care and have to pay for medication and treatment out of their own pockets. The absolute majority of people do not have social health insurance and cases of illness often end fatally.

This dire situation leaves countless families vulnerable to:
- Financial catastrophe from medical expenses
- Untreated chronic conditions
- Fatal outcomes from treatable illnesses
- Generational cycles of poverty due to healthcare debt

## Our Health Insurance Program

MARIPHIL Foundation addresses this critical need by providing:

### Comprehensive Coverage
- Medical consultations and diagnoses
- Hospital admissions and emergency care
- Essential medications and treatments
- Preventive care and regular check-ups
- Dental and vision care

### Emergency Medical Assistance
- 24/7 emergency response support
- Transportation to medical facilities
- Immediate treatment for life-threatening conditions
- Post-emergency care and follow-up

### Financial Protection
- Coverage for families who cannot afford insurance
- No out-of-pocket costs for covered services
- Protection from medical debt
- Sustainable healthcare access

## Impact and Results

Since implementing our health insurance program:
- **500+ families** enrolled in comprehensive health coverage
- **1,000+ medical consultations** provided annually
- **200+ emergency interventions** preventing fatal outcomes
- **Zero families** pushed into poverty due to medical expenses

## Program Benefits

### For Families
- Peace of mind knowing healthcare is accessible
- No delay in seeking medical attention
- Protection from financial ruin
- Focus on recovery, not costs

### For Communities
- Healthier population overall
- Reduced mortality rates
- Improved quality of life
- Stronger economic stability

## How It Works

1. **Enrollment**: Eligible families register for the program
2. **Coverage Activation**: Immediate access to healthcare services
3. **Medical Care**: Treatment at partner hospitals and clinics
4. **Direct Billing**: We handle all financial arrangements
5. **Follow-up Care**: Ongoing support and monitoring

## Success Stories

Our health insurance program has saved countless lives:
- Children receiving life-saving surgeries
- Mothers accessing prenatal and postnatal care
- Elderly receiving treatment for chronic conditions
- Families recovering from medical emergencies without debt

## Your Support Makes the Difference

Every contribution to our health insurance fund:
- Covers one family's annual healthcare needs: ₱15,000
- Provides emergency medical assistance: ₱5,000
- Supports preventive care programs: ₱3,000
- Enables life-saving treatments: ₱20,000+

Together, we can ensure that no one in our communities has to choose between healthcare and financial survival.
      `.trim(),
      coverImage: '/images/projects/Health Insurance and Emergency Care.jpeg',
      status: 'active',
    },
  });

  const project4 = await prisma.project.upsert({
    where: { slug: 'rice-sack-campaign' },
    update: {},
    create: {
      title: 'Rice Sack Campaign',
      slug: 'rice-sack-campaign',
      summary: 'Countless families in the Philippines have too little income to satisfy their hunger due to a lack of or only temporary employment opportunities. In the project area of Hilfsprojekt MARIPHIL e.V., many families also suffer from poverty and hunger during the Christmas season. MARIPHIL has set itself the goal of enabling many poor families to have a hunger-free Christmas and distributes rice to people in need.',
      content: `
# Rice Sack Campaign

Ensuring no family goes hungry during the Christmas season and beyond.

## The Challenge of Food Insecurity

Countless families in the Philippines have too little income to satisfy their hunger due to a lack of or only temporary employment opportunities. In the project area of Hilfsprojekt MARIPHIL e.V., many families also suffer from poverty and hunger during the Christmas season.

The reality for many Filipino families:
- Irregular or no employment opportunities
- Daily struggle to put food on the table
- Children going to bed hungry
- Impossible choices between food, medicine, and shelter
- Increased vulnerability during holiday seasons

## Our Mission: A Hunger-Free Christmas

MARIPHIL has set itself the goal of enabling many poor families to have a hunger-free Christmas and distributes rice to people in need. Rice, as the staple food in Filipino culture, provides essential sustenance and dignity to families facing extreme hardship.

## The Rice Sack Campaign

### What We Provide
Each participating family receives:
- A sack of rice (typically 25-50kg)
- Sufficient to feed a family for several weeks
- Distributed during the Christmas season
- Additional support throughout the year as needed

### Who We Serve
Our rice distribution reaches:
- Families with irregular employment
- Single-parent households
- Elderly persons living alone
- Families with sick or disabled members
- Communities affected by natural disasters
- Those facing temporary hardship

### Distribution Process
1. **Identification**: Community leaders help identify families in greatest need
2. **Registration**: Families register and provide basic information
3. **Distribution Events**: Organized rice distribution during Christmas season
4. **Follow-up**: Continued support and monitoring throughout the year

## Impact and Results

### Annual Reach
- **1,000+ families** receive rice during Christmas season
- **5,000+ individuals** directly benefited
- **Multiple communities** across the project area served
- **Year-round support** for families in crisis

### Beyond Immediate Relief
The campaign provides:
- Immediate hunger relief
- Reduced financial stress on families
- Dignity and hope during difficult times
- Stronger community bonds through collective support
- Opportunity for families to allocate limited resources to other needs

## Success Stories

**Maria's Story**: A single mother of four, Maria lost her job during the pandemic. The rice distribution allowed her to feed her children while she searched for new employment. Today, she volunteers to help distribute rice to other families.

**The Santos Family**: After Typhoon damage destroyed their crops, the Santos family received emergency rice support. This assistance helped them survive until they could replant and harvest again.

## How the Campaign Works

### Christmas Season Distribution
- Major distribution event in December
- Community gathering and celebration
- Blessing ceremony for received food
- Opportunity for families to connect and support each other

### Year-Round Emergency Support
- Rice available for families facing unexpected crises
- Quick response to natural disasters
- Support during illness or family emergencies
- Bridge assistance during employment gaps

## Your Support Makes the Difference

### Donation Impact
- **₱500** = 5kg of rice (feeds a small family for one week)
- **₱1,000** = 10kg of rice (feeds a family for two weeks)
- **₱2,500** = 25kg of rice (feeds a family for one month)
- **₱5,000** = 50kg sack of rice (feeds a family for two months)

### Sponsor a Family
Become a regular sponsor and provide monthly rice support to a specific family, helping them achieve long-term food security.

## The Difference Rice Makes

Rice is more than just food in Filipino culture - it represents:
- **Security**: Knowing the family will eat
- **Dignity**: Not having to beg for food
- **Hope**: Ability to focus on improving circumstances
- **Community**: Shared meals bring families together
- **Survival**: The most basic human need met

## Join Our Campaign

### Ways to Help
1. **Donate Rice**: Sponsor rice sacks for families in need
2. **Volunteer**: Help with distribution events
3. **Spread Awareness**: Share our campaign with others
4. **Corporate Partnership**: Company-sponsored distributions
5. **Recurring Support**: Monthly donations for sustained impact

## Looking Forward

While the Rice Sack Campaign addresses immediate hunger, our ultimate goal is to help families achieve food security through:
- Livelihood training programs
- Agricultural support
- Employment assistance
- Education opportunities for children

Every sack of rice we distribute represents more than just food - it represents care, dignity, and hope for a better tomorrow.

## Christmas Blessing

During our Christmas distribution, we remind families that they are not forgotten, that their community cares, and that together, we can ensure no one goes hungry during the season of celebration and hope.
      `.trim(),
      coverImage: '/images/projects/Rice Sack Campaign.png',
      status: 'active',
    },
  });

  const project5 = await prisma.project.upsert({
    where: { slug: '100000-trees-against-climate-change' },
    update: {},
    create: {
      title: '100,000 Trees Against Climate Change',
      slug: '100000-trees-against-climate-change',
      summary: 'MARIPHIL e.V. acquires and plants land in the Philippines with mixed forests of 10 – 20 typical tree species. Through the most gentle management possible and with the involvement of the local population, we would like to generate permanent income for the MARIPHIL projects on site, such as the children\'s village and the school, health or social projects.',
      content: `
# 100,000 Trees Against Climate Change

Fighting climate change while creating sustainable income for our communities.

## Our Reforestation Mission

MARIPHIL e.V. acquires and plants land in the Philippines with mixed forests of 10 – 20 typical tree species. Through the most gentle management possible and with the involvement of the local population, we would like to generate permanent income for the MARIPHIL projects on site, such as the children's village and the school, health or social projects.

## The Vision: 100,000 Trees

Our ambitious goal is to plant 100,000 trees across multiple locations in the Philippines, creating:
- Carbon sequestration and climate change mitigation
- Biodiversity preservation
- Sustainable income generation
- Environmental education opportunities
- Community empowerment through involvement

## Why Reforestation Matters

### Environmental Impact
The Philippines has experienced significant deforestation over the decades. Our reforestation efforts help:
- **Combat Climate Change**: Each tree absorbs CO2 from the atmosphere
- **Restore Ecosystems**: Native species support local wildlife
- **Prevent Soil Erosion**: Tree roots stabilize hillsides and riverbanks
- **Regulate Water Cycles**: Forests help maintain watershed health
- **Improve Air Quality**: Trees filter pollutants and produce oxygen

### Social and Economic Benefits
Beyond environmental impact, our forest projects provide:
- Employment opportunities for local communities
- Sustainable timber and non-timber forest products
- Educational sites for environmental awareness
- Recreation and ecotourism potential
- Long-term financial security for MARIPHIL programs

## Our Approach: Mixed Forest Ecosystems

### Diverse Tree Species (10-20 Types)
We plant a variety of native and beneficial species including:
- Indigenous hardwoods (Narra, Molave, Yakal)
- Fast-growing species (Mahogany, Falcata)
- Fruit-bearing trees (Mango, Rambutan, Durian)
- Bamboo varieties for rapid carbon capture
- Medicinal plants and herbs

This diversity ensures:
- Greater resilience against pests and diseases
- Multiple income streams from different products
- Natural pest control and soil enrichment
- Better adaptation to climate variations
- Rich habitat for wildlife

### Gentle Forest Management
Our sustainable forestry practices include:
- **Selective Harvesting**: Only mature trees are harvested
- **Continuous Forest Cover**: Maintaining canopy integrity
- **Natural Regeneration**: Encouraging native species growth
- **Minimal Intervention**: Letting nature guide the process
- **Community-Based Management**: Local knowledge and stewardship

## Community Involvement

### Local Participation
We actively involve local communities through:
- **Employment**: Planting, maintenance, and harvesting jobs
- **Training**: Sustainable forestry and agroforestry techniques
- **Profit Sharing**: Communities receive benefits from forest products
- **Decision Making**: Local input on management practices
- **Ownership**: Building community pride and responsibility

### Educational Programs
The forest serves as a living classroom:
- School field trips and environmental education
- Training in sustainable agriculture
- Climate change awareness programs
- Traditional ecological knowledge preservation
- Youth environmental leadership development

## Generating Sustainable Income

### Revenue Streams
Our forests generate income through:

1. **Sustainable Timber Harvesting**
   - Selective cutting of mature trees
   - High-value hardwoods for construction
   - Timeline: 15-25 years for first harvest

2. **Non-Timber Forest Products**
   - Fruits, nuts, and seeds
   - Medicinal plants and herbs
   - Rattan, bamboo, and handicraft materials
   - Continuous harvest opportunities

3. **Carbon Credits**
   - Registration in carbon offset programs
   - International climate finance
   - Additional revenue stream

4. **Ecotourism**
   - Nature trails and bird watching
   - Educational tours
   - Forest bathing and wellness programs

### Supporting MARIPHIL Projects
All income generated supports:
- **Children's Village**: Operations and maintenance
- **School Programs**: Educational materials and teacher salaries
- **Health Projects**: Medical supplies and insurance programs
- **Social Initiatives**: Community development activities
- **Future Expansion**: Growing our impact

## Project Implementation

### Phase 1: Land Acquisition (Years 1-2)
- Identify suitable land parcels
- Conduct environmental assessments
- Secure land titles and permits
- Engage with local communities
- **Target**: Acquire 100 hectares

### Phase 2: Planting (Years 2-5)
- Prepare land and nurseries
- Raise diverse tree seedlings
- Organize community planting events
- Implement irrigation systems
- **Target**: Plant 100,000 trees

### Phase 3: Maintenance (Years 5-15)
- Regular monitoring and care
- Replanting where needed
- Thinning and selective pruning
- Fire prevention measures
- **Target**: 80% survival rate

### Phase 4: Sustainable Harvest (Year 15+)
- Begin selective timber harvest
- Continuous non-timber product collection
- Ongoing reforestation and regeneration
- **Target**: Self-sustaining income generation

## Environmental Impact Projections

### Carbon Sequestration
100,000 trees will:
- Absorb approximately **2,000 tons of CO2 annually**
- Store carbon for decades or centuries
- Contribute to national climate targets
- Offset emissions equivalent to 400+ cars/year

### Biodiversity Benefits
- Habitat for **50+ bird species**
- Support for **100+ insect species**
- Corridor for wildlife movement
- Preservation of endangered native species
- Restoration of ecosystem services

## How You Can Participate

### Plant a Tree, Change a Life
- **₱500** = Plant 5 trees with your name
- **₱1,000** = Plant 10 trees and receive updates
- **₱5,000** = Plant 50 trees with a commemorative plaque
- **₱10,000** = Plant 100 trees and visit your forest

### Corporate Sponsorship
Companies can:
- Sponsor entire hectares of forest
- Organize employee planting events
- Offset corporate carbon footprints
- Demonstrate environmental responsibility
- Engage in team-building activities

### Volunteer Opportunities
Join us for:
- Tree planting events
- Forest maintenance activities
- Environmental education programs
- Community engagement initiatives
- Monitoring and research projects

## Long-Term Sustainability

### 30-Year Vision
Our forests are planned for multi-generational impact:
- **Years 1-15**: Establishment and growth
- **Years 15-30**: First sustainable harvests
- **Years 30+**: Perpetual forest with continuous regeneration

### Financial Sustainability
Projected income supports:
- **100%** of Children's Village operating costs by Year 20
- **50%** of school program expenses by Year 15
- **Emergency fund** for disaster relief
- **Expansion funds** for new projects

## Monitoring and Transparency

### Regular Reporting
We provide:
- Quarterly planting progress updates
- Annual growth and survival reports
- Financial statements of forest income
- Environmental impact assessments
- Photo and video documentation

### Technology Integration
- GPS mapping of all planting sites
- Drone monitoring of forest health
- Mobile app for sponsor updates
- Virtual forest tours
- Real-time data sharing

## Awards and Recognition

Our reforestation efforts have received:
- Recognition from the Philippine government
- Partnership with international environmental organizations
- Support from climate finance initiatives
- Featured in sustainability publications
- Model for other NGO reforestation projects

## Join the Forest Revolution

Every tree planted is a step toward:
- **Climate Resilience**: Adapting to environmental changes
- **Economic Security**: Building sustainable income
- **Community Empowerment**: Creating local opportunities
- **Biodiversity Protection**: Preserving nature's wealth
- **Legacy**: Leaving a green legacy for future generations

Together, we can plant 100,000 trees and create lasting positive change for the environment, communities, and MARIPHIL's mission to serve children and families in need.

## Plant Your Tree Today

Your contribution doesn't just plant a tree—it plants hope, sustainability, and a better future for the Philippines and our planet.
      `.trim(),
      coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      status: 'active',
    },
  });

  const project6 = await prisma.project.upsert({
    where: { slug: 'mariphil-water-treatment-plant' },
    update: {},
    create: {
      title: 'MARIPHIL Water Treatment Plant',
      slug: 'mariphil-water-treatment-plant',
      summary: 'There is usually more than enough water in a tropical country like the Philippines. But when it comes to clean drinking water, the situation is completely different. In the project area of the MARIPHIL aid project, particularly in Purok 3, Tubod, Carmen, Davao del Norte, the vast majority of people lack direct access to truly clean drinking water. To address this urgent need, MARIPHIL has opened a sustainable water treatment plant in the Philippines, aiming to provide safe and affordable drinking water to the local community.',
      content: `
# MARIPHIL Water Treatment Plant

Providing safe, clean drinking water to communities in need.

## The Water Crisis

There is usually more than enough water in a tropical country like the Philippines. But when it comes to clean drinking water, the situation is completely different. In the project area of the MARIPHIL aid project, particularly in Purok 3, Tubod, Carmen, Davao del Norte, the vast majority of people lack direct access to truly clean drinking water.

### The Reality
- Abundant rainfall but contaminated water sources
- Lack of proper water treatment infrastructure
- Waterborne diseases affecting communities
- Families spending significant income on bottled water
- Children missing school due to water-related illnesses

## Our Solution: Sustainable Water Treatment

To address this urgent need, MARIPHIL has opened a sustainable water treatment plant in the Philippines, aiming to provide safe and affordable drinking water to the local community.

### Plant Capabilities
- **Capacity**: 10,000 liters per day
- **Technology**: Multi-stage filtration and UV treatment
- **Coverage**: Serving 500+ families in the community
- **Quality**: Meets WHO drinking water standards
- **Sustainability**: Solar-powered operations

## How It Works

### Water Treatment Process

1. **Source Water Collection**
   - Deep well water extraction
   - Initial screening and pre-filtration
   - Regular source water testing

2. **Multi-Stage Filtration**
   - Sediment removal filters
   - Activated carbon filtration
   - Reverse osmosis purification
   - Mineral restoration

3. **UV Disinfection**
   - Ultraviolet light sterilization
   - Eliminates bacteria, viruses, and parasites
   - Chemical-free purification
   - Final safety barrier

4. **Quality Testing**
   - Daily water quality checks
   - Monthly laboratory analysis
   - Compliance with national standards
   - Transparent reporting to community

5. **Distribution**
   - On-site filling station
   - Affordable refill rates
   - Clean container provision
   - Home delivery for elderly/disabled

## Community Impact

### Health Benefits
Since the water treatment plant opened:
- **80% reduction** in waterborne diseases
- **50% decrease** in child sick days
- **Elimination** of typhoid cases in the area
- **Improved** overall community health indicators
- **Enhanced** child development and school attendance

### Economic Relief
The affordable water pricing provides:
- **60% savings** compared to bottled water costs
- **More disposable income** for families
- **Reduced medical expenses** from water-related illnesses
- **Time saved** from traveling to distant water sources
- **Economic stability** for low-income households

### Environmental Benefits
- Dramatic reduction in plastic bottle waste
- Lower carbon footprint from water transport
- Conservation of groundwater resources
- Community awareness of environmental issues
- Model for sustainable water management

## Pricing and Accessibility

### Affordable Rates
- **₱5 per 5 liters** (local residents)
- **₱10 per 10 liters** (standard rate)
- **₱40 per 50 liters** (bulk rate)
- **Free** for registered indigent families
- **50% discount** for senior citizens and PWDs

### Accessibility Features
- Open 7 days a week
- Extended hours (6 AM - 8 PM)
- Multiple filling stations
- Home delivery service available
- Mobile filling during emergencies

## Your Support Makes the Difference

Every contribution helps maintain and expand this vital resource:
- **₱5,000** = Filters for 1 month operations
- **₱10,000** = UV lamp replacement
- **₱25,000** = Solar panel maintenance
- **₱50,000** = New distribution equipment
- **₱100,000** = Fund a new water station location

Together, we're ensuring that clean water—a basic human right—is accessible to all.
      `.trim(),
      coverImage: '/images/projects/MARIPHIL Water Treatment Plant.jpg',
      status: 'active',
    },
  });

  console.log('Created projects:', project1, project2, project3, project4, project5, project6);

  // Create sample news posts
  const news1 = await prisma.news.upsert({
    where: { slug: 'sports-festival-childrens-village' },
    update: {
      coverImage: '/images/news/Sportfest im Kinderdorf.jpeg',
    },
    create: {
      title: 'Sports Festival in the Children\'s Village',
      slug: 'sports-festival-childrens-village',
      excerpt: 'An exciting day of sports and games brought joy to all the children at our village.',
      content: `
# Sports Festival in the Children's Village

Our children's village recently hosted an exciting sports festival filled with fun activities and friendly competition!

## Activities

The day included:
- Basketball and volleyball tournaments
- Relay races and obstacle courses
- Traditional Filipino games (patintero, tumbang preso)
- Prizes and medals for all participants

## Community Spirit

The event brought together children, staff, and volunteers in a celebration of teamwork, sportsmanship, and community spirit. Every child received participation medals and enjoyed refreshments throughout the day.

## Thank You

Special thanks to our volunteers and donors who made this event possible. Your support brings smiles and creates lasting memories for our children.
      `.trim(),
      coverImage: '/images/news/Sportfest im Kinderdorf.jpeg',
      publishedAt: new Date('2025-01-15'),
    },
  });

  const news2 = await prisma.news.upsert({
    where: { slug: 'summer-festival-2025' },
    update: {
      coverImage: '/images/news/Sommerfest 2025.jpg',
    },
    create: {
      title: 'Summer Festival 2025',
      slug: 'summer-festival-2025',
      excerpt: 'Join us for our annual Summer Festival celebration with activities for the whole community!',
      content: `
# Summer Festival 2025

Mark your calendars! Mariphil Foundation presents the Summer Festival 2025, a day of fun, food, and fellowship.

## Event Details

**Date:** April 20, 2025
**Time:** 9:00 AM - 5:00 PM
**Location:** Mariphil Children's Village

## Festival Highlights

- Live music and performances
- Food stalls featuring Filipino cuisine
- Games and activities for children
- Arts and crafts booths
- Raffle draws with exciting prizes

## Get Involved

We welcome volunteers and sponsors to help make this event special. Contact us to learn how you can participate!

All proceeds will support our educational programs and children's village operations.
      `.trim(),
      coverImage: '/images/news/Sommerfest 2025.jpg',
      publishedAt: new Date('2025-02-01'),
    },
  });

  const news3 = await prisma.news.upsert({
    where: { slug: 'mariphil-summer-festival-2025' },
    update: {
      coverImage: '/images/news/MARIPHIL Sommerfest 2025.jpeg',
    },
    create: {
      title: 'MARIPHIL Summer Festival 2025',
      slug: 'mariphil-summer-festival-2025',
      excerpt: 'A celebration of community, culture, and hope - don\'t miss our biggest event of the year!',
      content: `
# MARIPHIL Summer Festival 2025

Get ready for the most anticipated event of the year! The MARIPHIL Summer Festival is back and bigger than ever.

## What to Expect

This year's festival promises:
- Cultural performances showcasing Filipino heritage
- Interactive workshops for children and families
- Local vendor market supporting small businesses
- Photo booth and selfie stations
- Special guest speakers and testimonials

## Impact Your Community

By attending, you're not just having fun - you're supporting:
- Educational scholarships for underprivileged children
- Healthcare programs in underserved communities
- Sustainable livelihood projects for families

## Registration

Early bird tickets available now! Visit our website or contact our office to secure your spot.

Let's celebrate together and make a difference in the lives of Filipino children and families!
      `.trim(),
      coverImage: '/images/news/MARIPHIL Sommerfest 2025.jpeg',
      publishedAt: new Date('2025-02-10'),
    },
  });

  console.log('Created news posts:', news1, news2, news3);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });