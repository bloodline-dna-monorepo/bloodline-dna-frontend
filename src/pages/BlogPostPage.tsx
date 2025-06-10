  "use client"

  import { useParams, Link } from "react-router-dom"
  import { ArrowLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin } from "lucide-react"
  import img1 from '../../src/assets/blog/img1.jpg';

  const BlogPostPage = () => {
    const { id } = useParams<{ id: string }>()
    const postId = Number(id)

    // This would normally come from an API call based on the ID
    const posts = [
      {
        id: "1",
        title: "Understanding DNA Testing: A Comprehensive Guide",
        content: `
        <p class="mb-4">DNA testing has revolutionized how we understand our health, ancestry, and relationships. This comprehensive guide will walk you through the different types of DNA tests available, how they work, and what you can learn from them.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What is DNA Testing?</h2>
        
        <p class="mb-4">DNA testing is a scientific method used to identify and analyze an individual's genetic makeup. DNA (deoxyribonucleic acid) is the hereditary material in humans and almost all other organisms. Nearly every cell in a person's body has the same DNA.</p>
        
        <p class="mb-4">Most DNA is located in the cell nucleus (where it is called nuclear DNA), but a small amount of DNA can also be found in the mitochondria (where it is called mitochondrial DNA or mtDNA).</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Types of DNA Tests</h2>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">1. Paternity and Relationship Testing</h3>
        
        <p class="mb-4">Paternity tests are the most common type of DNA test. They determine whether a man is the biological father of a child. These tests compare the genetic material (DNA) of a child with that of the alleged father.</p>
        
        <p class="mb-4">Other relationship tests can determine sibling relationships, grandparentage, and other family connections.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">2. Ancestry DNA Testing</h3>
        
        <p class="mb-4">Ancestry DNA tests analyze your genetic code for clues about your family history and ethnic background. These tests can:</p>
        
        <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Estimate your ethnic origins (what percentage of your DNA comes from different regions around the world)</li>
        <li class="mb-2">Identify relatives through DNA matching</li>
        <li class="mb-2">Trace your maternal and paternal lineages</li>
        <li class="mb-2">Help build your family tree</li>
        </ul>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">3. Health and Genetic Predisposition Testing</h3>
        
        <p class="mb-4">These tests analyze your DNA for genetic variations associated with specific health conditions or traits. They can:</p>
        
        <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Identify carrier status for inherited conditions</li>
        <li class="mb-2">Assess genetic risk factors for certain diseases</li>
        <li class="mb-2">Provide information about how your body might respond to certain medications</li>
        <li class="mb-2">Reveal genetic traits like taste preferences or physical characteristics</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">How DNA Testing Works</h2>
        
        <p class="mb-4">While the specific methodology varies depending on the type of test, most DNA tests follow these general steps:</p>
        
        <ol class="list-decimal pl-6 mb-4">
        <li class="mb-2"><strong>Sample Collection:</strong> A DNA sample is collected, typically using a cheek swab, saliva sample, or blood test.</li>
        <li class="mb-2"><strong>DNA Extraction:</strong> The laboratory extracts DNA from the cells in your sample.</li>
        <li class="mb-2"><strong>DNA Analysis:</strong> The lab analyzes specific regions of your DNA, depending on the type of test.</li>
        <li class="mb-2"><strong>Results Interpretation:</strong> Scientists interpret the analysis to generate your results.</li>
        <li class="mb-2"><strong>Report Generation:</strong> A report is created explaining your results in an understandable format.</li>
        </ol>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Choosing the Right DNA Test</h2>
        
        <p class="mb-4">When selecting a DNA test, consider:</p>
        
        <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Your specific goals:</strong> What information are you hoping to learn?</li>
        <li class="mb-2"><strong>Test accuracy:</strong> Research the company's reputation and testing methods.</li>
        <li class="mb-2"><strong>Privacy policies:</strong> Understand how your genetic data will be stored and used.</li>
        <li class="mb-2"><strong>Cost:</strong> Prices vary widely depending on the type and complexity of the test.</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Your Results</h2>
        
        <p class="mb-4">DNA test results can sometimes be complex. Many testing companies provide detailed explanations, but it may be helpful to consult with a genetic counselor or healthcare provider to fully understand your results, especially for health-related tests.</p>
        
        <p class="mb-4">Remember that while DNA testing can provide valuable insights, it has limitations. Environmental factors, lifestyle choices, and other non-genetic factors play significant roles in many aspects of health and personal traits.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
        
        <p class="mb-4">DNA testing offers unprecedented access to information about our genetics, ancestry, and health. As technology advances, these tests continue to become more affordable, accessible, and comprehensive.</p>
        
        <p class="mb-4">Whether you're curious about your family history, want to understand your health risks, or need to confirm a biological relationship, DNA testing can provide valuable insights that were impossible to obtain just a few decades ago.</p>
        `,
        image: img1,
        date: "May 15, 2023",
        author: "Dr. Sarah Johnson",
        category: "Education",
        tags: ["DNA Testing", "Genetics", "Health", "Ancestry", "Science"],
        relatedPosts: [2, 5, 8],
      },
      {
        id: "2",
        title: "The Importance of Accredited DNA Testing Facilities",
        content: `
        <p class="mb-4">In an era where DNA testing plays a vital role in everything from legal proceedings to personal identity, the importance of using accredited DNA testing facilities cannot be overstated. Whether it’s for paternity testing, immigration cases, forensic investigations, or ancestry research, the accuracy and reliability of DNA results directly depend on the credibility of the testing lab.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What Does Accreditation Mean?</h2>
        
        <p class="mb-4">Accreditation is a formal recognition that a testing facility meets strict standards of quality and competence set by authoritative bodies, such as the International Organization for Standardization (ISO) or the American Association of Blood Banks (AABB). This process involves rigorous assessments of the lab’s procedures, staff qualifications, equipment, and quality control measures.</p>
                
        <h2 class="text-2xl font-bold mt-8 mb-4">Why Is Accreditation Important?</h2>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">1. Accuracy and Reliability</h3>
        
        <p class="mb-4">Accredited labs follow standardized procedures that minimize errors, ensuring test results are accurate and reproducible. This is vital, especially in legal cases like paternity testing or immigration where test outcomes can have life-changing effects.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">2. Compliance with Legal Standards</h3>
        
        <p class="mb-4">Many courts and government agencies only accept DNA results from accredited facilities. Using an accredited lab helps ensure your test results are legally valid and recognized.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">3. Health and Genetic Predisposition Testing</h3>
        
        <p class="mb-4">These tests analyze your DNA for genetic variations associated with specific health conditions or traits. They can:</p>
        
        <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Identify carrier status for inherited conditions</li>
        <li class="mb-2">Assess genetic risk factors for certain diseases</li>
        <li class="mb-2">Provide information about how your body might respond to certain medications</li>
        <li class="mb-2">Reveal genetic traits like taste preferences or physical characteristics</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">How DNA Testing Works</h2>
        
        <p class="mb-4">While the specific methodology varies depending on the type of test, most DNA tests follow these general steps:</p>
        
        <ol class="list-decimal pl-6 mb-4">
        <li class="mb-2"><strong>Sample Collection:</strong> A DNA sample is collected, typically using a cheek swab, saliva sample, or blood test.</li>
        <li class="mb-2"><strong>DNA Extraction:</strong> The laboratory extracts DNA from the cells in your sample.</li>
        <li class="mb-2"><strong>DNA Analysis:</strong> The lab analyzes specific regions of your DNA, depending on the type of test.</li>
        <li class="mb-2"><strong>Results Interpretation:</strong> Scientists interpret the analysis to generate your results.</li>
        <li class="mb-2"><strong>Report Generation:</strong> A report is created explaining your results in an understandable format.</li>
        </ol>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Choosing the Right DNA Test</h2>
        
        <p class="mb-4">When selecting a DNA test, consider:</p>
        
        <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Your specific goals:</strong> What information are you hoping to learn?</li>
        <li class="mb-2"><strong>Test accuracy:</strong> Research the company's reputation and testing methods.</li>
        <li class="mb-2"><strong>Privacy policies:</strong> Understand how your genetic data will be stored and used.</li>
        <li class="mb-2"><strong>Cost:</strong> Prices vary widely depending on the type and complexity of the test.</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Your Results</h2>
        
        <p class="mb-4">DNA test results can sometimes be complex. Many testing companies provide detailed explanations, but it may be helpful to consult with a genetic counselor or healthcare provider to fully understand your results, especially for health-related tests.</p>
        
        <p class="mb-4">Remember that while DNA testing can provide valuable insights, it has limitations. Environmental factors, lifestyle choices, and other non-genetic factors play significant roles in many aspects of health and personal traits.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
        
        <p class="mb-4">DNA testing offers unprecedented access to information about our genetics, ancestry, and health. As technology advances, these tests continue to become more affordable, accessible, and comprehensive.</p>
        
        <p class="mb-4">Whether you're curious about your family history, want to understand your health risks, or need to confirm a biological relationship, DNA testing can provide valuable insights that were impossible to obtain just a few decades ago.</p>
        `,
        image: "/blog-post-1.jpg",
        date: "May 15, 2023",
        author: "Dr. Sarah Johnson",
        category: "Education",
        tags: ["DNA Testing", "Genetics", "Health", "Ancestry", "Science"],
        relatedPosts: [2, 5, 8],
      },
      {
        id: "3",
        title: "DNA Testing for Ancestry: Tracing Your Genetic Heritage",
        content: `
        <p class="mb-4">DNA testing has opened a new window into our past, allowing individuals to uncover the geographic, ethnic, and familial roots that shape who they are today. This guide explores how ancestry DNA testing works, what it reveals, and how it can transform your understanding of identity and heritage.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What is Ancestry DNA Testing?</h2>
        
        <p class="mb-4">Ancestry DNA testing is a scientific process used to examine specific markers in your genetic code that are passed down through generations. These markers provide insights into your ethnic background and can help trace your lineage across time and geography.</p>
           
        <p class="mb-4">Your DNA contains information from both your maternal and paternal ancestors. Through careful analysis, scientists can estimate your ancestral origins and connect you with distant relatives.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">What Can You Learn from Ancestry DNA Testing?</h2>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">1. Ethnic Composition</h3>
        
        <p class="mb-4">An ancestry test can estimate what percentage of your DNA comes from various regions or populations around the world—such as East Asia, Sub-Saharan Africa, Northern Europe, or Indigenous Americas.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">2. Genetic Matches</h3>
        
        <p class="mb-4">Testing services often include a DNA-matching feature that identifies individuals in their database who share segments of DNA with you. These matches may be relatives you never knew you had—such as third cousins or half-siblings.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">3. Maternal and Paternal Lineages</h3>
        
        <p class="mb-4">Some tests analyze mitochondrial DNA (mtDNA) and Y-DNA (for males) to trace your maternal and paternal lines back thousands of years, helping you understand your deep ancestral migration patterns.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">4. Migration Patterns</h3>

        <p class="mb-4">Your results may include historical maps and timelines showing where your ancestors lived and how they migrated over generations.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">How DNA Testing Works</h2>
        
        <p class="mb-4">While the specific methodology varies depending on the type of test, most DNA tests follow these general steps:</p>
        
        <ol class="list-decimal pl-6 mb-4">
        <li class="mb-2"><strong>Sample Collection:</strong> A DNA sample is collected, typically using a cheek swab, saliva sample, or blood test.</li>
        <li class="mb-2"><strong>DNA Extraction:</strong> The laboratory extracts DNA from the cells in your sample.</li>
        <li class="mb-2"><strong>DNA Analysis:</strong> The lab analyzes specific regions of your DNA, depending on the type of test.</li>
        <li class="mb-2"><strong>Results Interpretation:</strong> Scientists interpret the analysis to generate your results.</li>
        <li class="mb-2"><strong>Report Generation:</strong> A report is created explaining your results in an understandable format.</li>
        </ol>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Choosing the Right DNA Test</h2>
        
        <p class="mb-4">When selecting a DNA test, consider:</p>
        
        <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Your specific goals:</strong> What information are you hoping to learn?</li>
        <li class="mb-2"><strong>Test accuracy:</strong> Research the company's reputation and testing methods.</li>
        <li class="mb-2"><strong>Privacy policies:</strong> Understand how your genetic data will be stored and used.</li>
        <li class="mb-2"><strong>Cost:</strong> Prices vary widely depending on the type and complexity of the test.</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Your Results</h2>
        
        <p class="mb-4">DNA test results can sometimes be complex. Many testing companies provide detailed explanations, but it may be helpful to consult with a genetic counselor or healthcare provider to fully understand your results, especially for health-related tests.</p>
        
        <p class="mb-4">Remember that while DNA testing can provide valuable insights, it has limitations. Environmental factors, lifestyle choices, and other non-genetic factors play significant roles in many aspects of health and personal traits.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
        
        <p class="mb-4">DNA testing offers unprecedented access to information about our genetics, ancestry, and health. As technology advances, these tests continue to become more affordable, accessible, and comprehensive.</p>
        
        <p class="mb-4">Whether you're curious about your family history, want to understand your health risks, or need to confirm a biological relationship, DNA testing can provide valuable insights that were impossible to obtain just a few decades ago.</p>
        `,
        image: "/blog-post-1.jpg",
        date: "May 15, 2023",
        author: "Dr. Sarah Johnson",
        category: "Education",
        tags: ["DNA Testing", "Genetics", "Health", "Ancestry", "Science"],
        relatedPosts: [2, 5, 8],
      }
    ]

    const relatedPosts = [
      {
        id: 2,
        title: "The Importance of Accredited DNA Testing Facilities",
        excerpt: "Why choosing an accredited lab for your DNA testing needs matters for accuracy and legal validity.",
        image: "/blog-post-2.jpg",
        date: "April 28, 2023",
        author: "Michael Chen, PhD",
        category: "Industry",
      },
      {
        id: 5,
        title: "Genetic Health Screening: Preventive Care Through DNA",
        excerpt: "How genetic testing can identify health risks before symptoms appear.",
        image: "/blog-post-5.jpg",
        date: "March 5, 2023",
        author: "Dr. Lisa Patel",
        category: "Health",
      },
      {
        id: 8,
        title: "How to Interpret Your DNA Test Results",
        excerpt: "A practical guide to understanding the information in your genetic test report.",
        image: "/blog-post-8.jpg",
        date: "January 20, 2023",
        author: "Dr. Thomas Brown",
        category: "Education",
      },
    ]
    const post = posts.find(p => Number(p.id) === postId)

    if (!post) return <div className="pt-24 text-center text-red-500">Post not found</div>

    return (
      <div className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-white opacity-80 hover:opacity-100 mb-6">
                <ArrowLeft size={20} className="mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center text-sm opacity-80 gap-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  By {post.author}
                </div>
                <div className="flex items-center">
                  <Tag size={16} className="mr-2" />
                  {post.category}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
                  <div className="p-8">
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

                    {/* Tags */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">TAGS:</h4>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Link
                            key={index}
                            to={`/blog?tag=${tag}`}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Share */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">SHARE THIS ARTICLE:</h4>
                      <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-blue-600">
                          <Facebook size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-400">
                          <Twitter size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-700">
                          <Linkedin size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <div className="flex items-start">
                    <img src="/author-sarah.jpg" alt={post.author} className="w-20 h-20 rounded-full object-cover mr-6" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{post.author}</h3>
                      <p className="text-gray-600 mb-4">
                        Dr. Sarah Johnson is a board-certified geneticist with over 15 years of experience in clinical
                        genetics. She specializes in genetic testing methodologies and their applications in healthcare.
                      </p>
                      <a href="#" className="text-[var(--primary)] font-medium hover:underline">
                        View all posts by this author
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Related Posts */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Related Articles</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex items-start">
                        <img
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-medium mb-1 hover:text-[var(--primary)]">
                            <Link to={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                          </h4>
                          <p className="text-sm text-gray-500">{relatedPost.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Categories</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        to="/blog?category=Education"
                        className="flex justify-between items-center hover:text-[var(--primary)]"
                      >
                        <span>Education</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">12</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog?category=Industry"
                        className="flex justify-between items-center hover:text-[var(--primary)]"
                      >
                        <span>Industry</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">8</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog?category=Ancestry"
                        className="flex justify-between items-center hover:text-[var(--primary)]"
                      >
                        <span>Ancestry</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">10</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog?category=Health"
                        className="flex justify-between items-center hover:text-[var(--primary)]"
                      >
                        <span>Health</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">15</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog?category=Technology"
                        className="flex justify-between items-center hover:text-[var(--primary)]"
                      >
                        <span>Technology</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">7</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div className="bg-[var(--background-alt)] rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600 mb-4">Stay updated with our latest articles and news.</p>
                  <form>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    <button type="submit" className="w-full btn btn-primary">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  export default BlogPostPage
