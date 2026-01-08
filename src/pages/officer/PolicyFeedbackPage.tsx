import { useState } from "react";
import { OfficerSidebar } from "@/components/layout/OfficerSidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Upload, Send, FileText, MessageSquare, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const feedbackData = [
  {
    id: 1,
    policy: "Traffic Management Policy 2024",
    citizen: "John Smith",
    sentiment: "positive",
    feedback: "The new traffic signal timings have reduced congestion significantly.",
    date: "2024-01-15",
  },
  {
    id: 2,
    policy: "Waste Management Guidelines",
    citizen: "Sarah Johnson",
    sentiment: "negative",
    feedback: "The collection schedule is not being followed in my area.",
    date: "2024-01-14",
  },
  {
    id: 3,
    policy: "Traffic Management Policy 2024",
    citizen: "Mike Brown",
    sentiment: "neutral",
    feedback: "Needs more clarity on peak hour restrictions.",
    date: "2024-01-13",
  },
  {
    id: 4,
    policy: "Public Park Usage Policy",
    citizen: "Emily Davis",
    sentiment: "positive",
    feedback: "The new timings are much better for families.",
    date: "2024-01-12",
  },
];

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return <ThumbsUp className="h-4 w-4 text-secondary" />;
    case "negative":
      return <ThumbsDown className="h-4 w-4 text-destructive" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

export default function PolicyFeedbackPage() {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded for analysis.`,
      });
    }
  };

  const handleAskQuestion = () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Question Submitted",
      description: "AI is analyzing your question...",
    });
    setQuestion("");
  };

  const positiveFeedback = feedbackData.filter((f) => f.sentiment === "positive").length;
  const negativeFeedback = feedbackData.filter((f) => f.sentiment === "negative").length;
  const neutralFeedback = feedbackData.filter((f) => f.sentiment === "neutral").length;

  return (
    <div className="flex h-screen bg-dashboard font-sans relative isolate overflow-hidden">
      <OfficerSidebar />

      <main className="flex-1 pt-14 lg:pt-0 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Policy Feedback
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage policy documents and view citizen feedback
            </p>
          </div>

          <Tabs defaultValue="feedback" className="space-y-6">
            <TabsList>
              <TabsTrigger value="feedback" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback Overview
              </TabsTrigger>
              <TabsTrigger value="upload" className="gap-2">
                <FileText className="h-4 w-4" />
                Policy Q&A
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feedback" className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-secondary/10 rounded-xl p-6 border border-secondary/20">
                  <div className="flex items-center gap-3">
                    <ThumbsUp className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-2xl font-display font-bold text-foreground">
                        {positiveFeedback}
                      </p>
                      <p className="text-sm text-muted-foreground">Positive</p>
                    </div>
                  </div>
                </div>
                <div className="bg-destructive/10 rounded-xl p-6 border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <ThumbsDown className="h-6 w-6 text-destructive" />
                    <div>
                      <p className="text-2xl font-display font-bold text-foreground">
                        {negativeFeedback}
                      </p>
                      <p className="text-sm text-muted-foreground">Negative</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3">
                    <Minus className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-display font-bold text-foreground">
                        {neutralFeedback}
                      </p>
                      <p className="text-sm text-muted-foreground">Neutral</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Table */}
              <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Recent Feedback
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Policy</TableHead>
                        <TableHead>Citizen</TableHead>
                        <TableHead>Sentiment</TableHead>
                        <TableHead>Feedback</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feedbackData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium text-primary">
                            {item.policy}
                          </TableCell>
                          <TableCell>{item.citizen}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getSentimentIcon(item.sentiment)}
                              <span className="capitalize text-sm">
                                {item.sentiment}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate text-muted-foreground">
                            {item.feedback}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {item.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Upload Section */}
                <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Upload Policy Document
                  </h2>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <span className="text-sm font-medium text-foreground">
                      {uploadedFile || "Click to upload PDF"}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PDF up to 25MB
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {/* Q&A Section */}
                <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Ask About Policy
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Your Question</Label>
                      <Textarea
                        placeholder="Ask any question about the uploaded policy..."
                        rows={4}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAskQuestion} className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Submit Question
                    </Button>
                  </div>
                </div>
              </div>

              {/* AI Response Placeholder */}
              <div className="bg-accent rounded-xl p-6 border border-accent-foreground/10">
                <h3 className="font-display font-semibold text-accent-foreground mb-3">
                  AI Response
                </h3>
                <p className="text-accent-foreground/80 text-sm">
                  Upload a policy document and ask a question to get AI-powered insights
                  and summaries about the policy content.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
